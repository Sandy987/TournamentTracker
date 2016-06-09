namespace TournamentTracker.Services.Interfaces
{
    public interface IEloService
    {
        EloResult CalcElo(int playerOneElo, int playerTwoElo, MatchWinner winner);
    }
}