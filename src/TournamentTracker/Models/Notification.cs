using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TournamentTracker.Models.Enumerations;

namespace TournamentTracker.Models
{
    public class Notification
    {
        public int Id {get; set;}
        public string SendingPlayerId {get; set;}
        public string ReceivingPlayerId {get; set;}
        public string Message {get; set;}
        public string Subject {get; set;}
        public ApplicationUser SendingPlayer {get; set;}
        public ApplicationUser ReceivingPlayer {get; set;}
        public NotificationStatus Status {get; set;}
        public bool HasOptions {get; set;}

        
    }
}