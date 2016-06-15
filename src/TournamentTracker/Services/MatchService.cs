using TournamentTracker.Models;
using TournamentTracker.Services.Interfaces;
using TournamentTracker.Data;
using System.Linq;
using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace TournamentTracker.Services 
{
    public class MatchService : IMatchService
    {
        private TournamentTrackerDbContext _db; 

        public MatchService(TournamentTrackerDbContext context)
        {
            _db = context;
        }

        public void AddMatch(Match match)
        {
            _db.Matches.Add(match);
        }

        public Match GetMatchById(int id)
        {
            return _db.Matches.SingleOrDefault(x => x.Id == id);
        }

        public IEnumerable<Match> GetMatchesByPlayerId(string playerId)
        {
            return _db.Matches
            .Include(m => m.PlayerOne)
            .Include(m => m.PlayerTwo)
            .Where(m => m.PlayerOneId == playerId || m.PlayerTwoId == playerId);
        }

        public void Save()
        {
            _db.SaveChanges();
        }

        public async Task SaveAsync()
        {
            await _db.SaveChangesAsync();
        }
    }
}