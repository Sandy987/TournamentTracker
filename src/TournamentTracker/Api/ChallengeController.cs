using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TournamentTracker.Api.Models;
using TournamentTracker.Services.Interfaces;
using TournamentTracker.Services.Enumerations;
using TournamentTracker.Models.Enumerations;
using TournamentTracker.Models;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using System;

namespace TournamentTracker.Api
{
	[Route("api/[controller]")]
    public class ChallengeController : Controller
    {
        private IChallengeService _challengeService;
        private IApplicationUserService _applicationUserService;

        private IMatchService _matchService;
        private IEloService _eloService;
        private INotificationService _notifactionService;
        private readonly UserManager<ApplicationUser> _userManager;

        public ChallengeController(IChallengeService challengeService, 
        IApplicationUserService applicationUserService,
        IMatchService matchService,
        IEloService eloService,
        INotificationService notificationService,
        UserManager<ApplicationUser> userManager)
        {
            _challengeService = challengeService;
            _applicationUserService = applicationUserService;
            _matchService = matchService;
            _eloService = eloService;
            _notifactionService = notificationService;
            _userManager = userManager;
        }

        [HttpGet("GetAllPlayer/{playerId}")]
        public IActionResult GetAllByPlayerId(string playerId)
        {
            if(string.IsNullOrEmpty(playerId)) return BadRequest();

            var challenges =  MapToModels(_challengeService.GetChallengesByPlayerId(playerId));
            return Ok(challenges);
        }

        //create a challenge
        [HttpPost("")]
        public async Task<IActionResult> Post([FromBody]ChallengeModel model)
        {

            var currentUserId = _userManager.GetUserId(User);

            if (model == null || 
                string.IsNullOrEmpty(model.ReceivingPlayerId) || 
                string.IsNullOrEmpty(model.SendingPlayerId) ||
                model.SendingPlayerId != currentUserId) return BadRequest();

            if (model.SendingPlayerId == model.ReceivingPlayerId) return BadRequest();

            var sendingPlayer = _applicationUserService.GetUserById(model.SendingPlayerId ?? "");
            var receivingPlayer = _applicationUserService.GetUserById(model.ReceivingPlayerId ?? "");

            var challenge = new Challenge
            {
                SendingPlayerId = model.SendingPlayerId,
                ReceivingPlayerId = model.ReceivingPlayerId,
                SendingPlayer = sendingPlayer,
                ReceivingPlayer = receivingPlayer,
                Type = model.ChallengeType,
                SendingPlayerStatus = ChallengeStatus.Accepted,
                ReceivingPlayerStatus = ChallengeStatus.Pending,
                MatchId = model.MatchId
            };

            var notification = new Notification
            {
                SendingPlayerId = model.SendingPlayerId,
                ReceivingPlayerId = model.ReceivingPlayerId,
                Status = NotificationStatus.Unread,
                Message = string.Format("{0} has challenged you to a match", sendingPlayer.PlayerName),
                Subject = "Challenge Request",
                HasOptions = true
            };

            _challengeService.AddChallenge(challenge);
            _notifactionService.AddNotification(notification);
            await _challengeService.SaveAsync();
            await _notifactionService.SaveAsync();
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
                if (challenge.Match == null)
                {
                    var newMatch = new Match
                    {
                        PlayerOneId = challenge.SendingPlayerId,
                        PlayerTwoId = challenge.ReceivingPlayerId,
                        Status = MatchStatus.Accepted
                    };
                    challenge.Match = newMatch;
                    _matchService.AddMatch(newMatch);
                }
                
                challenge.ReceivingPlayerStatus = ChallengeStatus.Accepted;

                var notification = new Notification
                {
                    SendingPlayerId = challenge.ReceivingPlayerId,
                    ReceivingPlayerId = challenge.SendingPlayerId,
                    Status = NotificationStatus.Unread,
                    Message = string.Format("{0} has accepted your challenge", challenge.ReceivingPlayer.PlayerName),
                    Subject = "Challenge Accepted"
                };

                _notifactionService.AddNotification(notification);
            }

            await _notifactionService.SaveAsync();
            await _matchService.SaveAsync();
            await _challengeService.SaveAsync();

            return Ok();
        }

        [HttpPost("{id}/Decline")]
        public async Task<IActionResult> DeclineChallenge(int id)
        {
            var challenge = _challengeService.GetChallengeById(id);
            var currentUserId = _userManager.GetUserId(User);

            if (challenge == null) return NotFound();

            //Make sure the logged in player is the recieving player calling.
            if (challenge.ReceivingPlayerId != currentUserId)
                return BadRequest("player is not the receiver of challenge");

            if (challenge.Type == ChallengeType.TableTennis)
            {               
                challenge.ReceivingPlayerStatus = ChallengeStatus.Declined;

                var notification = new Notification
                {
                    SendingPlayerId = challenge.ReceivingPlayerId,
                    ReceivingPlayerId = challenge.SendingPlayerId,
                    Status = NotificationStatus.Unread,
                    Message = string.Format("{0} has declined your challenge", challenge.ReceivingPlayer.PlayerName),
                    Subject = "Challenge Declined"
                };

                _notifactionService.AddNotification(notification);
            }
            await _notifactionService.SaveAsync();
            await _challengeService.SaveAsync();

            return Ok();
        }

        [HttpPost("{id}/Complete")]
        public async Task<IActionResult> CompleteChallenge(int id)
        {
            var challenge = _challengeService.GetChallengeById(id);
            var currentUserId = _userManager.GetUserId(User);

            if (challenge == null) return NotFound();

            if (challenge.ReceivingPlayerId != currentUserId && challenge.SendingPlayerId != currentUserId)
                return BadRequest("player is not a member of the challenge");
            
            var match = challenge.Match;
            
            var matchWinner = match.PlayerOneScore>match.PlayerTwoScore?match.PlayerOne:match.PlayerTwo;
            var matchLoser = match.PlayerOneScore>match.PlayerTwoScore?match.PlayerTwo:match.PlayerOne;

            if (currentUserId == challenge.SendingPlayerId)
            {
                challenge.SendingPlayerStatus = ChallengeStatus.Completed;
                CreateOneSidedMatchCompletionNotification(challenge.SendingPlayer, challenge.ReceivingPlayer, matchWinner.Id, match);
            }               
            if (currentUserId == challenge.ReceivingPlayerId)
            {
                challenge.ReceivingPlayerStatus = ChallengeStatus.Completed;
                CreateOneSidedMatchCompletionNotification(challenge.ReceivingPlayer, challenge.SendingPlayer, matchWinner.Id, match);
            }

            if (challenge.SendingPlayerStatus == ChallengeStatus.Completed && challenge.ReceivingPlayerStatus == ChallengeStatus.Completed)
            {
                if (match == null || match.Status == null || match.Status != MatchStatus.Accepted)
                    return BadRequest("match not completable");

                if (currentUserId == challenge.SendingPlayerId)
                    CreateMatchFinaliseNotification(challenge.SendingPlayer, challenge.ReceivingPlayer);
                if (currentUserId == challenge.ReceivingPlayerId)
                    CreateMatchFinaliseNotification(challenge.ReceivingPlayer, challenge.SendingPlayer);

                match.Status = MatchStatus.Completed;
                match.CompletionDate = DateTime.UtcNow;
                var playerOne = _applicationUserService.GetUserById(match.PlayerOneId);
                var playerTwo = _applicationUserService.GetUserById(match.PlayerTwoId);

                match.MatchWinnerId = matchWinner.Id;
                matchWinner.PlayerWins +=1;
                matchLoser.PlayerLoses -=1;
                if (match.MatchWinnerId != null)
                {
                    var eloResult = _eloService.CalcElo((int)playerOne.PlayerElo, 
                                                        (int)playerTwo.PlayerElo, 
                                                        match.MatchWinnerId==match.PlayerOneId?MatchWinner.PlayerOne:MatchWinner.PlayerTwo);
                    playerOne.PlayerElo = eloResult.PlayerOneElo;
                    playerTwo.PlayerElo = eloResult.PlayerTwoElo; 
                }             
            }

            await _notifactionService.SaveAsync();
            await _applicationUserService.SaveAsync();
            await _matchService.SaveAsync();
            await _challengeService.SaveAsync();

            return Ok();
        }

        private void CreateOneSidedMatchCompletionNotification(ApplicationUser sendingPlayer, ApplicationUser receivingPlayer, string winnerId, Match match)
        {  
                var notification = new Notification
                {
                    SendingPlayerId = sendingPlayer.Id,
                    ReceivingPlayerId = receivingPlayer.Id,
                    Status = NotificationStatus.Unread,
                    Message = string.Format("{0} wants to finalise the match with a score of {1}-{2} ({3} as winner)", 
                                            sendingPlayer.PlayerName, match.PlayerOneScore, match.PlayerTwoScore, 
                                            sendingPlayer.Id==winnerId?sendingPlayer.PlayerName:receivingPlayer.PlayerName),
                    Subject = "Match Finalization Request",
                    HasOptions = true

                };
                _notifactionService.AddNotification(notification);
        }

        private void CreateMatchFinaliseNotification(ApplicationUser sendingPlayer, ApplicationUser receivingPlayer)
        {  
                var notification = new Notification
                {
                    SendingPlayerId = sendingPlayer.Id,
                    ReceivingPlayerId = receivingPlayer.Id,
                    Status = NotificationStatus.Unread,
                    Message = string.Format("{0} accepted your submited score and the match has been finalised", sendingPlayer.PlayerName),
                    Subject = "Match Finalization Complete"
                };
                _notifactionService.AddNotification(notification);
        }

        private IEnumerable<ChallengeModel> MapToModels(IEnumerable<Challenge> challenges)
        {
            return challenges.Select(n =>
                new ChallengeModel {
                    Id = n.Id,
                    SendingPlayerId = n.SendingPlayerId,
                    SendingPlayerName = n.SendingPlayer.UserName,
                    SendingPlayerStatus = n.SendingPlayerStatus,
                    ReceivingPlayerId = n.ReceivingPlayerId,
                    ReceivingPlayerName = n.ReceivingPlayer.UserName,
                    ReceivingPlayerStatus = n.ReceivingPlayerStatus,
                    MatchId = n.MatchId
                }
            );
        }
    }
}