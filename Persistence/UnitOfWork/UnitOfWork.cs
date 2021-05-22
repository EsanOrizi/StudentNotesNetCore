using Persistence.Repositories;

namespace Persistence.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext _context;
        public IStudentRepository Students { get; private set; }
        public INoteRepository Notes { get; private set; }

        public UnitOfWork(DataContext context)
        {
            _context = context;
            Students = new StudentRepository(_context);
            Notes = new NoteRepository(_context);
        }

        public int Complete()
        {
            return _context.SaveChanges();
        }
        public void Dispose()
        {
            _context.Dispose();
        }


    }
}