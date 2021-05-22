using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Persistence.UnitOfWork;

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
            private readonly IUnitOfWork  _unitOfWork ;
            public Handler(IUnitOfWork  unitOfWork)
            {
                _unitOfWork  = unitOfWork;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {

                var note = await _unitOfWork.Notes.GetById(request.Id);

                if (note == null)
                    throw new RestException(HttpStatusCode.NotFound, new { note = "Not Found" });

               _unitOfWork.Notes.Remove(note);
               _unitOfWork.Complete();
               return Unit.Value;
               
            }
        }
    }
}