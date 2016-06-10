using TournamentTracker.Services.Enumerations;

namespace TournamentTracker.Services.Interfaces
{
    public interface IEloService: IDbContextService
    {
        EloResult CalcElo(int playerOneElo, int playerTwoElo, MatchWinner winner);
    }
}