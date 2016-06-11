using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TournamentTracker.Api.Models;
using TournamentTracker.Services.Interfaces;
using TournamentTracker.Models.Enumerations;
using TournamentTracker.Models;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;

namespace TournamentTracker.Api
{
	[Route("api/[controller]")]
    public class ChallengeController : Controller
    {
        private IChallengeService _challengeService;
        private IApplicationUserService _applicationUserService;

        private IMatchService _matchService;
        public ChallengeController(IChallengeService challengeService, 
        IApplicationUserService applicationUserService,
        IMatchService matchService)
        {
            _challengeService = challengeService;
            _applicationUserService = applicationUserService;
            _matchService = matchService;
        }

        [HttpGet("GetAllPlayer/{playerId}")]
        public IActionResult GetAllByPlayerId(string playerId)
        {
            if(string.IsNullOrEmpty(playerId)) return BadRequest();

            var player = _applicationUserService.GetUserById(playerId);
            if(player == null) return NotFound();

            var challenges =  MapToModels(player.Challenges);
            return Ok(challenges);
        }

        //create a challenge or a challenge completion
        [HttpPost("")]
        public async Task<IActionResult> Post([FromBody]ChallengeModel model)
        {
            //todo verify logged in player is one of the players of the match
            if(model == null) return BadRequest();

            var challenge = new Challenge()
            {
                SendingPlayerId = model.SendingPlayerId,
                ReceivingPlayerId = model.ReceivingPlayerId,
                SendingPlayer = _applicationUserService.GetUserById(model.SendingPlayerId ?? ""),
                ReceivingPlayer = _applicationUserService.GetUserById(model.ReceivingPlayerId ?? ""),
                Type = model.ChallengeType,
                Status = ChallengeStatus.Pending
            };
            
            //todo create a notification associated with challenge?
            _challengeService.AddChallenge(challenge);
            await _challengeService.SaveAsync();
            return Ok();
        }

        //todo  Make sure the logged in player is the recieving player calling.
        [HttpPost("{id}/AcceptChallenge")]
        public async Task<IActionResult> AcceptChallenge(int id)
        {
            var challenge = _challengeService.GetChallengeById(id);
            if(challenge == null || challenge.Type == ChallengeType.TableTennisCompletion) return NotFound();

            if(challenge.Match != null) return BadRequest("match already started");

            var newMatch = new Match{
                PlayerOneId = challenge.SendingPlayerId,
                PlayerTwoId = challenge.ReceivingPlayerId,
                MatchStatus = MatchStatus.Accepted
            };
            _matchService.AddMatch(newMatch);

            challenge.Status = ChallengeStatus.Accepted;

            await _matchService.SaveAsync();
            await _challengeService.SaveAsync();

            return Ok();
        }

        //todo Make sure the logged in player is the receiving player calling.
        [HttpPost("{id}/AcceptCompletion")]
        public async Task<IActionResult> AcceptCompletion(int id){
            var challenge = _challengeService.GetChallengeById(id);
            if(challenge == null || challenge.Type != ChallengeType.TableTennisCompletion) 
                return NotFound();

            var match = challenge.Match;

            if(match == null || match.MatchStatus == null || match.MatchStatus != MatchStatus.Accepted)
                return BadRequest("match not completable");

            //todo call ELO service and update player ELOs

            match.MatchStatus = MatchStatus.Completed;
            challenge.Status = ChallengeStatus.Accepted;

            await _matchService.SaveAsync();
            await _challengeService.SaveAsync();

            return Ok();
        }


        private IEnumerable<ChallengeModel> MapToModels(IEnumerable<Challenge> challenges)
        {
            return challenges.Select(n =>
                new ChallengeModel {
                    Id = n.Id,
                    SendingPlayerId = n.SendingPlayerId,
                    SendingPlayerName = n.SendingPlayer.UserName,
                    ReceivingPlayerId = n.ReceivingPlayerId,
                    ReceivingPlayerName = n.ReceivingPlayer.UserName,
                    MatchId = n.MatchId
                }
            );
        }
    }
}