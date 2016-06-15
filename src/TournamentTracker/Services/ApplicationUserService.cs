using TournamentTracker.Models;
using TournamentTracker.Services.Interfaces;
using TournamentTracker.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace TournamentTracker.Services 
{
    public class ApplicationUserService : IApplicationUserService
    {
        private TournamentTrackerDbContext _db; 

        public ApplicationUserService(TournamentTrackerDbContext context)
        {
            _db = context;
        }

        public ApplicationUser GetUserById(string id)
        {
            return _db.Players
                    .Include(p => p.Matches)
                    .ThenInclude(m => m.PlayerTwo)
                    .Include(p => p.Challenges)
                    .Include(p => p.Notifications)
                    .ThenInclude(p => p.ReceivingPlayer)
                    .Include(p => p.Notifications)
                    .ThenInclude(p => p.SendingPlayer)
                    .SingleOrDefault(x => x.Id == id);
        }

        public IQueryable<ApplicationUser> GetAll()
        {
            return _db.Players.AsQueryable();
        }

        public void Save()
        {
            _db.SaveChanges();
        }

        public async Task SaveAsync(){
            await _db.SaveChangesAsync();
        }
    }
}