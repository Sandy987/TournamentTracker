using TournamentTracker.Models;

namespace TournamentTracker.Services.Interfaces
{
    public interface IChallengeService: IDbContextService
    {
        void AddChallenge(Challenge challenge);
        Challenge GetChallengeById(int id);
        Challenge GetChallengeByMatchId(int id);
    }
}