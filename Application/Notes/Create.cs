using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;
using FluentValidation;
using Persistence.Repositories;

namespace Application.Notes
{
    public class Create
    {
        public class Command : IRequest
        {

            public Guid Id { get; set; }

            public String Name { get; set; }

            public String ProgressRating { get; set; }

            public String ExtraNote { get; set; }

            public DateTime DateAdded { get; set; }

            public Guid StudentId { get; set; }
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
                var note = new Note
                {
                    Id = request.Id,
                    Name = request.Name,
                    ProgressRating = request.ProgressRating,
                    ExtraNote = request.ExtraNote,
                    DateAdded = request.DateAdded,
                    StudentId = request.StudentId

                };

                await _noteRepository.Add(note);
                await _noteRepository.Save();

                return Unit.Value;

            }
        }
    }
}