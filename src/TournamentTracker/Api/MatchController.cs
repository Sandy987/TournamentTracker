using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TournamentTracker.Api.Models;
using TournamentTracker.Services.Interfaces;
using TournamentTracker.Models.Enumerations;
using TournamentTracker.Models;

namespace TournamentTracker.Api
{
     [Route("api/[controller]")]
    public class MatchController
    {
        private IMatchService _matchService;
        private IApplicationUserService _applicationUserService;

        public MatchController(IMatchService matchService, IApplicationUserService applicationUserService)
        {
            _matchService = matchService;
            _applicationUserService = applicationUserService;
        }

       
        [HttpGet("{id}")]
        public MatchModel Get(int id)
        {
            var match = _matchService.GetMatchById(id);
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

        [HttpPost]
        public void Post([FromBody]MatchModel model)
        {
            var match = new Match()
            {
                Id = model.Id,
                PlayerOne = _applicationUserService.GetUserById(model.PlayerOneId.ToString()),
                PlayerTwo = _applicationUserService.GetUserById(model.PlayerTwoId.ToString()),
                MatchWinnerId = model.WinnerId,
                MatchStatus = MatchStatus.Pending
            };
            _matchService.AddMatch(match);
            _matchService.Save();
        }

    }
}
