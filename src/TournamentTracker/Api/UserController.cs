using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TournamentTracker.Data;
using TournamentTracker.Api.Models;

namespace TournamentTracker.Api
{
    [Route("api/[controller]"), Authorize]
    public class UserController : Controller
    {
        private TournamentTrackerDbContext _db;

        public UserController(TournamentTrackerDbContext context)
        {
            _db = context;
        }

        [HttpGet]
        public UserModel Get(string id)
        {
            var user = _db.Users
                            .SingleOrDefault(u => u.Id == id);
            
            return new UserModel
            {
                Id = user.Id,
                PlayerName = user.PlayerName
            };
        }

        [HttpPatch]
        public async Task Patch(string id, string playerName)
        {
            var user = _db.Users
                            .SingleOrDefault(u => u.Id == id);

            user.PlayerName = playerName;

            await _db.SaveChangesAsync();
        }
    }
}
