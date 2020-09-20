using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Notes
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }

            public String Name { get; set; }

            public String ProgressRating { get; set; }

            public String ExtraNote { get; set; }

            public DateTime? DateAdded { get; set; }

            public Guid? StudentId { get; set; }
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

                var note = await _context.Notes.FindAsync(request.Id);

                if (note == null)
                    throw new Exception("Could not find note");

                note.Name = request.Name ?? note.Name;
                note.ProgressRating = request.ProgressRating ?? note.ProgressRating;
                note.ExtraNote = request.ExtraNote ?? note.ExtraNote;
                note.DateAdded = request.DateAdded ?? note.DateAdded;
                note.StudentId = request.StudentId ?? note.StudentId;


                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}