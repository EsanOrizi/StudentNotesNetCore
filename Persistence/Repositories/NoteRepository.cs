using Domain;

namespace Persistence.Repositories
{
    public class NoteRepository : GenericRepository<Note>, INoteRepository
    {
        public NoteRepository(DataContext context) : base(context)
        {
        }
    }
}