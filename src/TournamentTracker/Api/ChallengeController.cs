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
        public ChallengeController(IChallengeService challengeService, IApplicationUserService applicationUserService)
        {
            _challengeService = challengeService;
            _applicationUserService = applicationUserService;
        }

        [HttpGet("GetAllPlayer/{playerId}")]
        public IActionResult GetAllByPlayerId(string playerId)
        {
            if(string.IsNullOrEmpty(playerId)) return BadRequest();

            var player = _applicationUserService.GetUserById(playerId);
            if(player == null) return NotFound();

            var notifications =  MapToModels(player.Challenges);
            return Ok(notifications);
        }

        [HttpPost("")]
        public async Task<IActionResult> Post([FromBody]ChallengeModel model)
        {
            if(model == null) return BadRequest();

            var challenge = new Challenge()
            {
                SendingPlayerId = model.SendingPlayerId,
                ReceivingPlayerId = model.ReceivingPlayerId,
                SendingPlayer = _applicationUserService.GetUserById(model.SendingPlayerId ?? ""),
                ReceivingPlayer = _applicationUserService.GetUserById(model.ReceivingPlayerId ?? ""),
                Status = ChallengeStatus.Pending
            };

            _challengeService.AddChallenge(challenge);
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
                    ReceivingPlayerName = n.ReceivingPlayer.UserName              
                }
            );
        }
    }
}