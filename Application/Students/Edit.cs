using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Students
{
    public class Edit
    {
        public class Command : IRequest
        {
            public int Id { get; set; }

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

                var student = await _context.Students.FindAsync(request.Id);

                if (student == null)
                    throw new Exception("Could not find student");

                student.Name = request.Name ?? student.Name;
                student.Address = request.Address ?? student.Address;
                student.Phone = request.Phone ?? student.Phone;


                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}