using TournamentTracker.Models;
using TournamentTracker.Services.Interfaces;
using TournamentTracker.Data;
using System.Linq;
using System;
using System.Threading.Tasks;

namespace TournamentTracker.Services 
{
    public class ChallengeService : IChallengeService
    {
        private TournamentTrackerDbContext _db; 

        public ChallengeService(TournamentTrackerDbContext context)
        {
            _db = context;
        }

        public void AddChallenge(Challenge challenge)
        {
            _db.Challenges.Add(challenge);
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