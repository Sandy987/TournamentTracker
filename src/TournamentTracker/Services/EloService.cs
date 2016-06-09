using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TournamentTracker.Services.Enumerations;
using TournamentTracker.Services.Interfaces;

namespace TournamentTracker.Services 
{
    public class EloService
    {
        private int factor = 32;
        private int divisor = 400;

        public EloResult CalcElo(int playerOneElo, int playerTwoElo, MatchWinner winner)
        {
            // A2 = A1 + 32 (G-(1/(1+10 ** ((B1-A1)/400))))
            float G = 0;
            float A1 = System.Convert.ToSingle(playerOneElo);
            float B1 = System.Convert.ToSingle(playerTwoElo);
            if (winner == MatchWinner.PlayerOne) { G = 0; }
            if (winner == MatchWinner.PlayerTwo) { G = 1; }

            double addsub = factor * (G - (1 / (1 + System.Math.Pow(10, ((B1 - A1) / divisor)))));
            int addsubint = System.Convert.ToInt32(addsub);

            EloResult result = new EloResult();

            if (winner == MatchWinner.PlayerOne)
            {
                result.PlayerOneElo = playerOneElo + addsubint;
                result.PlayerTwoElo = playerTwoElo - addsubint;
            }
            if (winner == MatchWinner.PlayerTwo)
            {
                result.PlayerOneElo = playerOneElo + addsubint;
                result.PlayerTwoElo = playerTwoElo - addsubint;
            }
            result.changeValue = addsubint;

            return result;
        }
    }
}