using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TournamentTracker.Api.Models;
using TournamentTracker.Services.Interfaces;
using TournamentTracker.Models.Enumerations;
using TournamentTracker.Models;
using System.Threading.Tasks;
using System.Linq;

namespace TournamentTracker.Api
{
	[Route("api/[controller]")]
    public class MatchController : Controller
    {
        private IMatchService _matchService;
        private IApplicationUserService _applicationUserService;

        public MatchController(IMatchService matchService, IApplicationUserService applicationUserService)
        {
            _matchService = matchService;
            _applicationUserService = applicationUserService;
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
                MatchStatus = match.MatchStatus,
                MatchCompletion = match.MatchCompletion
            };

            return Ok(matchModel);
        }

        [HttpGet("GetByPlayer/{playerId}")]
        public IActionResult GetByPlayerId(string playerId)
        {
            if(string.IsNullOrEmpty(playerId)) return BadRequest();

            var player = _applicationUserService.GetUserById(playerId);
            if(player == null) return NotFound();

            var matches = player.Matches.Select(m =>
                new MatchModel {
                    Id = m.Id,
                    PlayerOneName = m.PlayerOne?.UserName,
                    PlayerOneId = m.PlayerOneId,
                    PlayerTwoName = m.PlayerTwo?.UserName,
                    PlayerTwoId = m.PlayerTwoId,
                    PlayerOneScore = m.PlayerOneScore,
                    PlayerTwoScore = m.PlayerTwoScore,
                    MatchWinnerId = m.MatchWinnerId,
                    MatchStatus = m.MatchStatus,
                    MatchCompletion = m.MatchCompletion
                }
            );
            return Ok(matches);
        }


        [HttpPost("")]
        public async Task<IActionResult> Post([FromBody]MatchModel model)
        {
            if(model == null) return BadRequest();

            var match = new Match()
            {
                PlayerOne = _applicationUserService.GetUserById(model.PlayerOneId ?? ""),
                PlayerTwo = _applicationUserService.GetUserById(model.PlayerTwoId ?? ""),
                MatchStatus = model.MatchStatus ?? MatchStatus.Pending
            };

            _matchService.AddMatch(match);
            await _matchService.SaveAsync();
            return Ok();
        }

        [HttpPatch("")]
        public async Task<IActionResult> Patch([FromBody]MatchModel model)
        {
            if(model == null) return BadRequest();

            var match = _matchService.GetMatchById(model.Id);
            
            if(match == null) return NotFound();

            match.MatchCompletion = model.MatchCompletion ?? match.MatchCompletion;
            match.MatchStatus = model.MatchStatus ?? match.MatchStatus;
            match.MatchWinnerId = model.MatchWinnerId ?? match.MatchWinnerId;
            match.PlayerOneId = model.PlayerOneId ?? match.PlayerOneId;
            match.PlayerTwoId = model.PlayerTwoId ?? match.PlayerTwoId;
            match.PlayerOneScore = model.PlayerOneScore ?? match.PlayerOneScore;
            match.PlayerTwoScore = model.PlayerTwoScore ?? match.PlayerTwoScore;

            await _matchService.SaveAsync();

            return Ok();
        }

    }
}
