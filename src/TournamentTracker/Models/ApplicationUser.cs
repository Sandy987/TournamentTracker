using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace TournamentTracker.Models
{
    // Add profile data for application users by adding properties to the ApplicationUser class
    public class ApplicationUser : IdentityUser
    {
        public string PlayerName { get; set; }
        public double PlayerElo {get; set;}
        public int PlayerWins {get; set;}
        public int PlayerLoses {get; set;}
    }
}
