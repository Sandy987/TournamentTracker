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
                PlayerName = user.PlayerName,
                PlayerElo = user.PlayerElo,
                PlayerWins = user.PlayerWins,
                PlayerLoses = user.PlayerLoses,
                Username = user.UserName,
                Email = user.Email
            };
        }

        [HttpPatch]
        public async Task Patch(UserModel userModel)
        {
            var user = _db.Users
                            .SingleOrDefault(u => u.Id == userModel.Id);

            user.PlayerName = userModel.PlayerName;
            user.Email = userModel.Email;
            user.PlayerElo = userModel.PlayerElo;
            user.PlayerLoses = userModel.PlayerLoses;
            user.PlayerWins = userModel.PlayerWins;
            user.UserName = userModel.Username;

            await _db.SaveChangesAsync();
        }
    }
}
