using TournamentTracker.Models;

namespace TournamentTracker.Services.Interfaces
{
    public interface IMatchService: IDbContextService
    {
        Match GetMatchById(int id);
        void AddMatch(Match match);
    }
}