using TournamentTracker.Models;
using System.Linq;

namespace TournamentTracker.Services.Interfaces
{
    public interface IApplicationUserService : IDbContextService
    {
            ApplicationUser GetUserById(string id);
            IQueryable<ApplicationUser> GetAll();
    }
}