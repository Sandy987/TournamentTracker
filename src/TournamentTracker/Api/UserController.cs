using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TournamentTracker.Services.Interfaces;
using TournamentTracker.Api.Models;

namespace TournamentTracker.Api
{
    //[Authorize]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private IApplicationUserService _userService;

        public UserController(IApplicationUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            if(string.IsNullOrWhiteSpace(id)) return BadRequest();

            var user = _userService.GetUserById(id);

            if(user == null) return NotFound();
            
            return Ok(new UserModel
            {
                Id = user.Id,
                PlayerName = user.PlayerName,
                PlayerElo = user.PlayerElo,
                PlayerWins = user.PlayerWins,
                PlayerLoses = user.PlayerLoses,
                Username = user.UserName,
                Email = user.Email
            });
        }

        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            var users = _userService.GetAll().Select(
                user => new UserModel{
                     Id = user.Id,
                    PlayerName = user.PlayerName,
                    PlayerElo = user.PlayerElo,
                    PlayerWins = user.PlayerWins,
                    PlayerLoses = user.PlayerLoses,
                    Username = user.UserName,
                }
            ).ToList();
            
            return Ok(users);
        }


        [HttpPatch("")]
        public async Task<IActionResult> Patch([FromBody]UserModel userModel)
        {
            if(userModel == null || string.IsNullOrEmpty(userModel.Id)) return BadRequest();

            
            var user = _userService.GetUserById(userModel.Id);
            
            if(user== null) return NotFound();

            user.PlayerName = userModel.PlayerName ?? user.PlayerName;
            user.Email = userModel.Email ?? user.Email;
            user.PlayerElo = userModel.PlayerElo ?? user.PlayerElo;
            user.PlayerLoses = userModel.PlayerLoses ?? user.PlayerLoses;
            user.PlayerWins = userModel.PlayerWins ?? user.PlayerWins;
            user.UserName = userModel.Username ?? user.UserName;

            await _userService.SaveAsync();
            return Ok();
        }
    }
}
