using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence.UnitOfWork;

namespace Application.Notes
{
    public class List
    {
        public class Query : IRequest<List<Note>> { }

        public class Handler : IRequestHandler<Query, List<Note>>
        {
            private readonly IUnitOfWork _unitOfWork;
            public Handler(IUnitOfWork  unitOfWork)
            {
                _unitOfWork  = unitOfWork;

            }

            public async Task<List<Note>> Handle(Query request, CancellationToken cancellationToken)
            {
                var notes = await _unitOfWork.Notes.GetAll();
                return notes;
            }
        }
    }
}