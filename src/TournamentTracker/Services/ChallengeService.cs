using TournamentTracker.Models;
using TournamentTracker.Services.Interfaces;
using TournamentTracker.Data;
using System.Linq;
using System;
using System.Threading.Tasks;

namespace TournamentTracker.Services 
{
    public class ChallengeService : INotificationService
    {
        private TournamentTrackerDbContext _db; 

        public ChallengeService(TournamentTrackerDbContext context)
        {
            _db = context;
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