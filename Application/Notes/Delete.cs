using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Persistence.Repositories;

namespace Application.Notes
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }

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

                var note = await _noteRepository.GetById(request.Id);

                if (note == null)
                    throw new RestException(HttpStatusCode.NotFound, new { note = "Not Found" });

                _noteRepository.Remove(note);
                await _noteRepository.Save();

               return Unit.Value;
               
            }
        }
    }
}