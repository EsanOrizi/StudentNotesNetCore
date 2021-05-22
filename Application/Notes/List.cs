using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence.Repositories;

namespace Application.Notes
{
    public class List
    {
        public class Query : IRequest<List<Note>> { }

        public class Handler : IRequestHandler<Query, List<Note>>
        {
            private readonly INoteRepository _noteRepository;
            public Handler(INoteRepository noteRepository)
            {
                _noteRepository = noteRepository;

            }

            public async Task<List<Note>> Handle(Query request, CancellationToken cancellationToken)
            {
                var notes = await _noteRepository.GetAll();

                return notes;
            }
        }
    }
}