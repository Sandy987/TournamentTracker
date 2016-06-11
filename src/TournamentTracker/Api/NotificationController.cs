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
    public class NotificationController : Controller
    {
        private INotificationService _notificationService;
        private IApplicationUserService _applicationUserService;
        public NotificationController(INotificationService notificationService, IApplicationUserService applicationUserService)
        {
            _notificationService = notificationService;
            _applicationUserService = applicationUserService;
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

        private IEnumerable<NotificationModel> MapToModels(IEnumerable<Notification> notifications)
        {
            return notifications.Select(n =>
                new NotificationModel {
                    Id = n.Id,
                    SendingPlayerId = n.SendingPlayerId,
                    SendingPlayerName = n.SendingPlayer.UserName,
                    ReceivingPlayerId = n.ReceivingPlayerId,
                    ReceivingPlayerName = n.ReceivingPlayer.UserName,
                    Message = n.Message                
                }
            );
        }
    }
}