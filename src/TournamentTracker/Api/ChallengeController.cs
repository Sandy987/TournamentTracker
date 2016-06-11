using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TournamentTracker.Api.Models;
using TournamentTracker.Services.Interfaces;
using TournamentTracker.Models.Enumerations;
using TournamentTracker.Models;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Identity;

namespace TournamentTracker.Api
{
	[Route("api/[controller]")]
    public class ChallengeController : Controller
    {
        private IChallengeService _challengeService;
        private IApplicationUserService _applicationUserService;

        private IMatchService _matchService;
        private readonly UserManager<ApplicationUser> _userManager;

        public ChallengeController(IChallengeService challengeService, 
        IApplicationUserService applicationUserService,
        IMatchService matchService,
        UserManager<ApplicationUser> userManager)
        {
            _challengeService = challengeService;
            _applicationUserService = applicationUserService;
            _matchService = matchService;
            _userManager = userManager;
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

            var currentUserId = _userManager.GetUserId(User);

            if (model == null || 
                string.IsNullOrEmpty(model.ReceivingPlayerId) || 
                string.IsNullOrEmpty(model.SendingPlayerId) ||
                model.SendingPlayerId != currentUserId) return BadRequest();

            if (model.MatchId != null)
            {
                if (model.ChallengeType == ChallengeType.TableTennis)
                    return BadRequest("cannot create challenge for an existing match");

                var match = _matchService.GetMatchById(model.MatchId.Value);
                if (match.PlayerOneId != currentUserId && match.PlayerTwoId != currentUserId)
                    return BadRequest("cannot complete a challenge for a match the player is not part of");
            }

            var challenge = new Challenge()
            {
                SendingPlayerId = model.SendingPlayerId,
                ReceivingPlayerId = model.ReceivingPlayerId,
                SendingPlayer = _applicationUserService.GetUserById(model.SendingPlayerId ?? ""),
                ReceivingPlayer = _applicationUserService.GetUserById(model.ReceivingPlayerId ?? ""),
                Type = model.ChallengeType,
                Status = ChallengeStatus.Pending,
                MatchId = model.MatchId
            };


            //todo create a notification associated with challenge?
            _challengeService.AddChallenge(challenge);
            await _challengeService.SaveAsync();
            return Ok();
        }

        [HttpPost("{id}/Accept")]
        public async Task<IActionResult> AcceptChallenge(int id)
        {
            var challenge = _challengeService.GetChallengeById(id);
            var currentUserId = _userManager.GetUserId(User);

            if (challenge == null) return NotFound();

            //Make sure the logged in player is the recieving player calling.
            if (challenge.ReceivingPlayerId != currentUserId)
                return BadRequest("player is not the receiver of challenge");

            if (challenge.Type == ChallengeType.TableTennis)
            {
                if (challenge.Match != null) return BadRequest("match already started");
                var newMatch = new Match
                {
                    PlayerOneId = challenge.SendingPlayerId,
                    PlayerTwoId = challenge.ReceivingPlayerId,
                    MatchStatus = MatchStatus.Accepted
                };
                _matchService.AddMatch(newMatch);

                challenge.Status = ChallengeStatus.Accepted;
            }
            else if(challenge.Type == ChallengeType.TableTennisCompletion)
            {
                var match = challenge.Match;

                if (match == null || match.MatchStatus == null || match.MatchStatus != MatchStatus.Accepted)
                    return BadRequest("match not completable");

                //todo call ELO service and update player ELOs

                match.MatchStatus = MatchStatus.Completed;
                challenge.Status = ChallengeStatus.Accepted;
            }

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