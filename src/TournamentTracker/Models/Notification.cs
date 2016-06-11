using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TournamentTracker.Models.Enumerations;

namespace TournamentTracker.Models
{
    public class Notification
    {
        public string SendingPlayerId {get; set;}
        public string ReceivingPlayerId {get; set;}
        public string Message {get; set;}
        public ApplicationUser SendingPlayer {get; set;}
        public ApplicationUser ReceivingPlayer {get; set;}
        public NotificationStatus Status {get; set;}
        public NotificationType Type {get; set;}
    }
}