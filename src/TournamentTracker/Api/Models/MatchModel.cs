using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TournamentTracker.Models.Enumerations;

namespace TournamentTracker.Api.Models
{
    public class MatchModel
    {
        public int Id { get; set; }
        public string PlayerOneName { get; set; }
        public string PlayerOneId {get; set;}
        public string PlayerTwoName {get; set;}
        public string PlayerTwoId {get; set;}
        public int? PlayerOneScore {get; set;}
        public int? PlayerTwoScore {get; set;}
        public string MatchWinnerId{get; set;}
        public MatchStatus? MatchStatus {get; set;}
        public DateTime? MatchCompletion {get; set;}
    }
}
