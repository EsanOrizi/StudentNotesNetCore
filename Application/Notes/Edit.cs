using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using FluentValidation;
using System.Net;
using Application.Errors;
using Persistence.Repositories;

namespace Application.Notes
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }

            public String Name { get; set; }

            public String ProgressRating { get; set; }

            public String ExtraNote { get; set; }

            public DateTime? DateAdded { get; set; }

            public Guid? StudentId { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Name).NotEmpty();
                RuleFor(x => x.ProgressRating).NotEmpty();
                RuleFor(x => x.ExtraNote).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly INoteRepository _noteRepository;
            public Handler(INoteRepository noteRepository)
            {
                _noteRepository = noteRepository;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {

                var note =  await _noteRepository.GetById(request.Id);

                if (note == null)
                    throw new RestException(HttpStatusCode.NotFound, new { note = "Not Found" });

                note.Name = request.Name ?? note.Name;
                note.ProgressRating = request.ProgressRating ?? note.ProgressRating;
                note.ExtraNote = request.ExtraNote ?? note.ExtraNote;
                note.DateAdded = request.DateAdded ?? note.DateAdded;
                note.StudentId = request.StudentId ?? note.StudentId;

                await _noteRepository.Save();
               
                return Unit.Value;

            }
        }
    }
}