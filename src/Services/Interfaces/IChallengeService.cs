using TournamentTracker.Models;
using System.Collections.Generic;

namespace TournamentTracker.Services.Interfaces
{
    public interface IChallengeService: IDbContextService
    {
        void AddChallenge(Challenge challenge);
        Challenge GetChallengeById(int id);
        Challenge GetChallengeByMatchId(int id);
        IEnumerable<Challenge> GetChallengesByPlayerId(string playerId);
    }
}