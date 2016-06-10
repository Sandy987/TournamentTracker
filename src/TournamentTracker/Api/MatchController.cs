using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TournamentTracker.Api.Models;
using TournamentTracker.Services.Interfaces;
using TournamentTracker.Models.Enumerations;
using TournamentTracker.Models;

namespace TournamentTracker.Api
{
    public class MatchController : Controller
    {
        private IMatchService _matchService;
        private IApplicationUserService _applicationUserService;

        public MatchController(IMatchService matchService, IApplicationUserService applicationUserService)
        {
            _matchService = matchService;
            _applicationUserService = applicationUserService;
        }

        [Route("api/[controller]/{id}")]
        [HttpGet]
        public MatchModel Get(int id)
        {
            var match = _matchService.GetMatchById(id);
            if (match == null) return null;
            var matchModel = new MatchModel() 
            {
                Id = match.Id,
                PlayerOneName = match.PlayerOne.UserName,
                PlayerTwoName = match.PlayerTwo.UserName,
                PlayerOneScore = match.PlayerOneScore,
                PlayerTwoScore = match.PlayerTwoScore,
            };
            return matchModel;
        }

        [Route("api/[controller]")]
        [HttpPost]
        public void Post([FromBody]MatchModel model)
        {
            var match = new Match()
            {
                PlayerOne = _applicationUserService.GetUserById(model.PlayerOneId??""),
                PlayerTwo = _applicationUserService.GetUserById(model.PlayerTwoId??""),
                MatchWinnerId = model.WinnerId,
                MatchStatus = MatchStatus.Pending
            };

            _matchService.AddMatch(match);
            _matchService.Save();
        }

    }
}
