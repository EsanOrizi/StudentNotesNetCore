using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Persistence.Repositories;

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
            private readonly IStudentRepository _studentRepository;
            public Handler(IStudentRepository studentRepository)
            {
                _studentRepository = studentRepository;
            }

            public async Task<Student> Handle(Query request, CancellationToken cancellationToken)
            {
                var student =  await _studentRepository.GetById(request.Id);

                if (student == null)
                    throw new RestException(HttpStatusCode.NotFound, new { student = "Not Found" });

                return student;
            }
        }
    }
}