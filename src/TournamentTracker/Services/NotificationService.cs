using TournamentTracker.Models;
using TournamentTracker.Services.Interfaces;
using TournamentTracker.Data;
using System.Linq;
using System;
using System.Threading.Tasks;

namespace TournamentTracker.Services 
{
    public class NotificationService : INotificationService
    {
        private TournamentTrackerDbContext _db; 

        public NotificationService(TournamentTrackerDbContext context)
        {
            _db = context;
        }
    }
}