using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TournamentTracker.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace TournamentTracker.Api
{
    [Route("api/[controller]")]
    public class PingController
    {
        public string Get()
        {
            return "Pong";
        }
    }
}
