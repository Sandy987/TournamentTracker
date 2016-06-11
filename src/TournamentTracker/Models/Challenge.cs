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
        public ChallengeStatus Status {get; set;}
        public ChallengeType Type {get; set;}
    }
}