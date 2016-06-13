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
    public class NotificationController : Controller
    {
        private INotificationService _notificationService;
        private IApplicationUserService _applicationUserService;
        private readonly UserManager<ApplicationUser> _userManager;
        public NotificationController(INotificationService notificationService, IApplicationUserService applicationUserService, UserManager<ApplicationUser> userManager)
        {
            _notificationService = notificationService;
            _applicationUserService = applicationUserService;
            _userManager = userManager;
        }

        [HttpGet("GetAllPlayer/{playerId}")]
        public IActionResult GetAllByPlayerId(string playerId)
        {
            if(string.IsNullOrEmpty(playerId)) return BadRequest();

            var player = _applicationUserService.GetUserById(playerId);
            if(player == null) return NotFound();

            var notifications =  MapToModels(player.Notifications);
            return Ok(notifications);
        }

        //for sending a notification
        [HttpPost("")]
        public async Task<IActionResult> Post([FromBody]NotificationModel model)
        {
            var currentUserId = _userManager.GetUserId(User);
            if (model == null || model.SendingPlayerId != currentUserId)
                return BadRequest();

            var notification = new Notification()
            {
                SendingPlayerId = model.SendingPlayerId,
                ReceivingPlayerId = model.ReceivingPlayerId,
                SendingPlayer = _applicationUserService.GetUserById(model.SendingPlayerId ?? ""),
                ReceivingPlayer = _applicationUserService.GetUserById(model.ReceivingPlayerId ?? ""),
                Message = model.Message,
                Status = NotificationStatus.Unread,
                Subject = model.Subject,
                HasOptions = model.HasOptions
            };

            _notificationService.AddNotification(notification);
            await _notificationService.SaveAsync();
            return Ok();
        }

        //used to change the status of a notification (read, deleted)
        [HttpPatch("")]
        public async Task<IActionResult> Patch([FromBody]NotificationModel model)
        {
            var currentUserId = _userManager.GetUserId(User);
            if (model == null || model.ReceivingPlayerId != currentUserId)
                return BadRequest();

            var notification = _notificationService.GetNotificationById(model.Id);
            
            if(notification == null) return NotFound();

            notification.Status = model.Status ?? notification.Status;

            await _notificationService.SaveAsync();

            return Ok();
        }

        private IEnumerable<NotificationModel> MapToModels(IEnumerable<Notification> notifications)
        {
            return notifications.Select(n =>
                new NotificationModel {
                    Id = n.Id,
                    SendingPlayerId = n.SendingPlayerId,
                    SendingPlayerName = n.SendingPlayer.UserName,
                    ReceivingPlayerId = n.ReceivingPlayerId,
                    ReceivingPlayerName = n.ReceivingPlayer.UserName,
                    Message = n.Message,
                    Subject = n.Subject,
                    HasOptions = n.HasOptions,
                    ChallengeId = n.ChallengeId

                }
            );
        }
    }
}