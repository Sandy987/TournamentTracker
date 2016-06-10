using TournamentTracker.Models;
using TournamentTracker.Services.Interfaces;
using TournamentTracker.Data;
using System.Linq;
using System;
using System.Threading.Tasks;

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