using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Persistence;

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
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Student> Handle(Query request, CancellationToken cancellationToken)
            {



                var student = await _context.Students.FindAsync(request.Id);

                if (student == null)
                    throw new RestException(HttpStatusCode.NotFound, new { student = "Not Found" });

                return student;
            }
        }
    }
}