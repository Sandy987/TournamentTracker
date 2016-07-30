using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using TournamentTracker.Services.Interfaces;
using TournamentTracker.Api.Models;
using TournamentTracker.Models;
using Microsoft.Extensions.Logging;

namespace TournamentTracker.Api
{
    [Authorize]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly ILogger _logger;

        private IApplicationUserService _userService;

        public UserController(IApplicationUserService userService,
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            ILoggerFactory loggerFactory)
        {
            _userService = userService;
             _signInManager = signInManager;
             _userManager = userManager;
            _logger = loggerFactory.CreateLogger<UserController>();
            
        }

        [HttpPost("Login")]
        [AllowAnonymous]
        public async Task<IActionResult> ApiLogin([FromBody] LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                // This doesn't count login failures towards account lockout
                // To enable password failures to trigger account lockout, set lockoutOnFailure: true
                var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, lockoutOnFailure: false);
                if (result.Succeeded)
                {
                    _logger.LogInformation(1, "User logged in.");

                    var user = await _userManager.FindByNameAsync(model.Email);
                    return Ok(new UserModel {
                        Id = user.Id,
                        PlayerName = user.PlayerName,
                        PlayerElo = user.PlayerElo,
                        PlayerWins = user.PlayerWins,
                        PlayerLoses = user.PlayerLoses,
                        UserName = user.UserName,
                        Email = user.Email
                    });
                }

                if (result.IsLockedOut)
                {
                    _logger.LogWarning(2, "User account locked out.");
                    return BadRequest("Lockout");
                }
            } 
            return BadRequest(ModelState);
        }

        [HttpPost("Register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] RegisterUserViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = new ApplicationUser {
                    UserName = model.Email,
                    Email = model.Email,
                    PlayerName = model.PlayerName,
                    PlayerElo = 1000,
                };
                
                var result = await _userManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    await _signInManager.SignInAsync(user, isPersistent: false);
                    _logger.LogInformation(3, "User created a new account with password.");
                    return Ok(
                        new UserModel{
                            Id = user.Id,
                            PlayerName = user.PlayerName,
                            PlayerElo = user.PlayerElo,
                            PlayerWins = user.PlayerWins,
                            PlayerLoses = user.PlayerLoses,
                            UserName = user.UserName,
                            Email = user.Email
                        }
                    );
                }
                AddErrors(result);
            }
      
            return BadRequest(ModelState);
        }

        [HttpPost("GetCurrentUser")]
        [AllowAnonymous]
        public async Task<IActionResult> CurrentUser()
        {
            var currentUser = await _userManager.GetUserAsync(User);

            if (currentUser == null)
                return BadRequest("not logged on");

            return Ok(new UserModel
            {
                Id = currentUser.Id,
                PlayerName = currentUser.PlayerName,
                PlayerElo = currentUser.PlayerElo,
                PlayerWins = currentUser.PlayerWins,
                PlayerLoses = currentUser.PlayerLoses,
                UserName = currentUser.UserName,
                Email = currentUser.Email
            });
        }

        [HttpPost("logoff")]
        public async Task<IActionResult> LogOff()
        {
            await _signInManager.SignOutAsync();
            return Ok();
        }


        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            if(string.IsNullOrWhiteSpace(id)) return BadRequest();
            var currentUserId = _userManager.GetUserId(User);

            var user = _userService.GetUserById(id);

            if(user == null) return NotFound();
            
            return Ok(new UserModel
            {
                Id = user.Id,
                PlayerName = user.PlayerName,
                PlayerElo = user.PlayerElo,
                PlayerWins = user.PlayerWins,
                PlayerLoses = user.PlayerLoses,
                UserName = user.UserName,
                Email = user.Id==currentUserId?user.Email:string.Empty
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
                    UserName = user.UserName,
                }
            ).ToList();
            
            return Ok(users);
        }

        [HttpPatch("")]
        public async Task<IActionResult> Patch([FromBody]UserModel userModel)
        {
            if(userModel == null || string.IsNullOrEmpty(userModel.Id)) return BadRequest();
            var currentUserId = _userManager.GetUserId(User);
            if (currentUserId == null || currentUserId != userModel.Id) return BadRequest();

            var user = _userService.GetUserById(userModel.Id);
            
            if(user== null) return NotFound();

            user.PlayerName = userModel.PlayerName ?? user.PlayerName;
            user.Email = userModel.Email ?? user.Email;

            //Client shouldn't be able to update these... lol
            // user.PlayerElo = userModel.PlayerElo ?? user.PlayerElo;
            // user.PlayerLoses = userModel.PlayerLoses ?? user.PlayerLoses;
            // user.PlayerWins = userModel.PlayerWins ?? user.PlayerWins;
            user.UserName = userModel.UserName ?? user.UserName;

            await _userService.SaveAsync();
            return Ok();
        }
        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }
        }
    }
}
