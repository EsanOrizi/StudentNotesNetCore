using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Students
{
    public class Create
    {
        public class Command : IRequest
        {

            public Guid Id { get; set; }

            public string Name { get; set; }

            public string Address { get; set; }

            public string Phone { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var student = new Student
                {
                    Id = request.Id,
                    Name = request.Name,
                    Address = request.Address,
                    Phone = request.Phone
                };

                _context.Students.Add(student);
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}