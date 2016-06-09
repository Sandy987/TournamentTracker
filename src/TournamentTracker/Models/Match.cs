using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TournamentTracker.Models
{
    //TODO: Fill this out properly later - To be corrected by someone who knows what they're doing
    public class Match
    {
        public int Id { get; set; }
        public ApplicationUser PlayerOne { get; set; }
        public ApplicationUser PlayerTwo { get; set; }
        public int PlayerOneScore { get; set; }
        public int PlayerTwoScore { get; set; }
    }
}
