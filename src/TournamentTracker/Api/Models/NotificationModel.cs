using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TournamentTracker.Models.Enumerations;

namespace TournamentTracker.Api.Models
{
    public class NotificationModel
    {
        public int Id {get; set;}
        public string SendingPlayerId {get; set;}
        public string ReceivingPlayerId {get; set;}
        public string SendingPlayerName {get; set;}
        public string ReceivingPlayerName {get; set;}
        public string Message {get; set;}
        public string Subject {get; set;}
        public NotificationStatus? Status {get; set;}
        public bool HasOptions { get; set;}
        public int? ChallengeId { get; set; }
    }
}