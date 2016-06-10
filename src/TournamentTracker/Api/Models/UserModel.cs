using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TournamentTracker.Api.Models
{
    public class UserModel
    {
        public string Id { get; set; }
        public string PlayerName { get; set; }
        public double PlayerElo {get; set;}
        public int PlayerWins {get; set;}
        public int PlayerLoses {get; set;}
        public string Username {get; set;}
        public string Email {get; set;}
    }
}
