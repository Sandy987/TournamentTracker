using TournamentTracker.Models;

namespace TournamentTracker.Services.Interfaces
{
    public interface IMatchService
    {
        Match GetMatchById(int id);
        void AddMatch(Match match);
        void Save();
    }
}