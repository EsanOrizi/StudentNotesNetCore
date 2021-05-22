using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Persistence.UnitOfWork;

namespace Application.Students
{
    public class Details
    {
        public class Query : IRequest<Student>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Student>
        {
            private readonly IUnitOfWork  _unitOfWork;
            public Handler(IUnitOfWork  unitOfWork)
            {
                _unitOfWork = unitOfWork;
            }

            public async Task<Student> Handle(Query request, CancellationToken cancellationToken)
            {
                var student =  await _unitOfWork.Students.GetById(request.Id);

                if (student == null)
                    throw new RestException(HttpStatusCode.NotFound, new { student = "Not Found" });

                return student;
            }
        }
    }
}