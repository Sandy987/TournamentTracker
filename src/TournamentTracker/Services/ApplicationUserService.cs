using TournamentTracker.Models;
using TournamentTracker.Services.Interfaces;
using TournamentTracker.Data;
using System.Linq;

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
            return _db.Users.SingleOrDefault(x => x.Id == id);
        }
    }
}