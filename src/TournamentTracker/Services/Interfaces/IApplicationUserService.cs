using TournamentTracker.Models;

namespace TournamentTracker.Services.Interfaces
{
    public interface IApplicationUserService : IDbContextService
    {
            ApplicationUser GetUserById(string id);

    }
}