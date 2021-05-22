using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence.UnitOfWork;

namespace Application.Students
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }

        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly IUnitOfWork  _unitOfWork;

            public Handler(IUnitOfWork  unitOfWork)
            {
                _unitOfWork  = unitOfWork;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {

                var student = await _unitOfWork.Students.GetById(request.Id);

                _unitOfWork.Students.Remove(student);
                _unitOfWork.Complete();

                return Unit.Value;


            }
        }
    }
}