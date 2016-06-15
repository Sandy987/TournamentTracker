using TournamentTracker.Models;
using System.Collections.Generic;

namespace TournamentTracker.Services.Interfaces
{
    public interface IMatchService: IDbContextService
    {
        Match GetMatchById(int id);
        void AddMatch(Match match);
        IEnumerable<Match> GetMatchesByPlayerId(string playerId);
    }
}