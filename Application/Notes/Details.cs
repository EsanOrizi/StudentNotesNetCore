using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using System.Net;
using Application.Errors;
using Persistence.Repositories;

namespace Application.Notes
{
    public class Details
    {
        public class Query : IRequest<Note>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Note>
        {
            private readonly INoteRepository _noteRepository;
            public Handler(INoteRepository noteRepository)
            {
                _noteRepository = noteRepository;
            }

            public async Task<Note> Handle(Query request, CancellationToken cancellationToken)
            {
                var note = await _noteRepository.GetById(request.Id);

                if (note == null)
                    throw new RestException(HttpStatusCode.NotFound, new { note = "Not Found" });

                return note;
            }
        }
    }
}