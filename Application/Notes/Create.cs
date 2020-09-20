using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Notes
{
    public class Create
    {
        public class Command : IRequest
        {

            public Guid Id { get; set; }

            public String Name { get; set; }

            public String ProgressRating { get; set; }

            public String ExtraNote { get; set; }

            public DateTime DateAdded { get; set; }

            public Guid StudentId { get; set; }
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
                var note = new Note
                {
                    Id = request.Id,
                    Name = request.Name,
                    ProgressRating = request.ProgressRating,
                    ExtraNote = request.ExtraNote,
                    DateAdded = request.DateAdded,
                    StudentId = request.StudentId

                };

                _context.Notes.Add(note);
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}