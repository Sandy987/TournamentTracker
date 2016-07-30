using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TournamentTracker.Models.Enumerations;

namespace TournamentTracker.Models
{
    public class Challenge
    {
        public int Id {get; set;}
        public string SendingPlayerId {get; set;}
        public string ReceivingPlayerId {get; set;}
        public ApplicationUser SendingPlayer {get; set;}
        public ApplicationUser ReceivingPlayer {get; set;}
        public ChallengeStatus SendingPlayerStatus {get; set;}
        public ChallengeStatus ReceivingPlayerStatus{get; set;}
        public ChallengeType Type {get; set;}
        public int? MatchId {get; set;}
        public Match Match {get; set;}
        
        public ICollection<Notification> Notifications { get; set; }

        public Challenge()
        {
            Notifications = new List<Notification>();
        }
    }
}