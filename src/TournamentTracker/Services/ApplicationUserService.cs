using TournamentTracker.Models;
using TournamentTracker.Services.Interfaces;
using TournamentTracker.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

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
            return _db.Players.Include(p => p.Matches).SingleOrDefault(x => x.Id == id);
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