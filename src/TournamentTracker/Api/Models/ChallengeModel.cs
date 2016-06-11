using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TournamentTracker.Models.Enumerations;

namespace TournamentTracker.Api.Models
{
    public class ChallengeModel
    {
        public int Id {get; set;}
        public string SendingPlayerId {get; set;}
        public string ReceivingPlayerId {get; set;}
        public string SendingPlayerName {get; set;}
        public string ReceivingPlayerName {get; set;}
        public ChallengeType ChallengeType {get; set;}
        public ChallengeStatus? Status {get; set;}
        public int? MatchId {get; set;}
    }
}