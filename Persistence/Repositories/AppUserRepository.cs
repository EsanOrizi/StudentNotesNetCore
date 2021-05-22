using Domain;

namespace Persistence.Repositories
{
    public class AppUserRepository : GenericRepository<AppUser>, IAppUserRepository
    {
        public AppUserRepository(DataContext context) : base(context)
        {
        }
    }
}