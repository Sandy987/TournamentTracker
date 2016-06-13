using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TournamentTracker.Api.Models;
using TournamentTracker.Services.Interfaces;
using TournamentTracker.Models.Enumerations;
using TournamentTracker.Models;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.AspNetCore.Identity;

namespace TournamentTracker.Api
{
    //[Authorize]
	[Route("api/[controller]")]
    public class MatchController : Controller
    {
        private IMatchService _matchService;
        private IApplicationUserService _applicationUserService;
        private IChallengeService _challengeService;
        private readonly UserManager<ApplicationUser> _userManager; 
        public MatchController(IMatchService matchService, IApplicationUserService applicationUserService, 
                               IChallengeService challengeService, UserManager<ApplicationUser> userManager)
        {
            _matchService = matchService;
            _applicationUserService = applicationUserService;
            _challengeService = challengeService;
            _userManager = userManager;
        }

       
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var match = _matchService.GetMatchById(id);
            if (match == null) return NotFound();

            var matchModel = new MatchModel() 
            {
                Id = match.Id,
                PlayerOneName = match.PlayerOne?.UserName,
                PlayerOneId = match.PlayerOneId,
                PlayerTwoName = match.PlayerTwo?.UserName,
                PlayerTwoId = match.PlayerTwoId,
                PlayerOneScore = match.PlayerOneScore,
                PlayerTwoScore = match.PlayerTwoScore,
                MatchWinnerId = match.MatchWinnerId,
                MatchStatus = match.Status,
                MatchCompletion = match.CompletionDate
            };

            return Ok(matchModel);
        }

        [HttpGet("GetByPlayer/{playerId}")]
        public IActionResult GetByPlayerId(string playerId)
        {
            if(string.IsNullOrEmpty(playerId)) return BadRequest();

            var player = _applicationUserService.GetUserById(playerId);
            if(player == null) return NotFound();

            var matches = _matchService.GetMatchesByPlayerId(playerId).Select(m =>
                new MatchModel {
                    Id = m.Id,
                    PlayerOneName = m.PlayerOne?.PlayerName,
                    PlayerOneId = m.PlayerOneId,
                    PlayerTwoName = m.PlayerTwo?.PlayerName,
                    PlayerTwoId = m.PlayerTwoId,
                    PlayerOneScore = m.PlayerOneScore,
                    PlayerTwoScore = m.PlayerTwoScore,
                    MatchWinnerId = m.MatchWinnerId,
                    MatchStatus = m.Status,
                    MatchCompletion = m.CompletionDate
                }
            );
            return Ok(matches);
        }

        //this is really only for impromtu challenges.
        //matches are normally created via challenges
        [HttpPost("")]
        public async Task<IActionResult> Post([FromBody]MatchModel model)
        {
            var currentUserId = _userManager.GetUserId(User);
            if (model == null || (model.PlayerOneId != currentUserId && model.PlayerTwoId != currentUserId))
                return BadRequest();

            var match = new Match()
            {
                PlayerOne = _applicationUserService.GetUserById(model.PlayerOneId ?? ""),
                PlayerTwo = _applicationUserService.GetUserById(model.PlayerTwoId ?? ""),
                Status = MatchStatus.Pending
            };

            _matchService.AddMatch(match);
            await _matchService.SaveAsync();
            return Ok();
        }

        //this only updates score
        [HttpPatch("")]
        public async Task<IActionResult> Patch([FromBody]MatchModel model)
        {
            var currentUserId = _userManager.GetUserId(User);
            if (model == null || (model.PlayerOneId != currentUserId && model.PlayerTwoId != currentUserId))
                return BadRequest();

            var match = _matchService.GetMatchById(model.Id);
            
            if(match == null) return NotFound();
            if(match.Status == null || match.Status != MatchStatus.Completed)
            {
                //set the status of the players back to not completed on the challenge when score is patched
                var challenge = _challengeService.GetChallengeByMatchId(match.Id);
                if (challenge != null && (match.PlayerOneScore != (model.PlayerOneScore ?? match.PlayerOneScore) 
                || match.PlayerTwoScore != (model.PlayerTwoScore ?? match.PlayerTwoScore)))
                {
                    challenge.SendingPlayerStatus = ChallengeStatus.Accepted;
                    challenge.ReceivingPlayerStatus = ChallengeStatus.Accepted;
                }    

                match.PlayerOneScore = model.PlayerOneScore ?? match.PlayerOneScore;
                match.PlayerTwoScore = model.PlayerTwoScore ?? match.PlayerTwoScore;
            }

            await _matchService.SaveAsync();

            return Ok();
        }
    }
}
