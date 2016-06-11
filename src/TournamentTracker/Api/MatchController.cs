using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TournamentTracker.Api.Models;
using TournamentTracker.Services.Interfaces;
using TournamentTracker.Models.Enumerations;
using TournamentTracker.Models;
using System.Threading.Tasks;

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
                PlayerOneName = match.PlayerOne.UserName,
                PlayerTwoName = match.PlayerTwo.UserName,
                PlayerOneScore = match.PlayerOneScore,
                PlayerTwoScore = match.PlayerTwoScore,
            };

            return Ok(matchModel);
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
