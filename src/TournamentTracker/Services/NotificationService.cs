using TournamentTracker.Models;
using TournamentTracker.Services.Interfaces;
using TournamentTracker.Data;
using System.Linq;
using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace TournamentTracker.Services 
{
    public class NotificationService : INotificationService
    {
        private TournamentTrackerDbContext _db; 

        public NotificationService(TournamentTrackerDbContext context)
        {
            _db = context;
        }

        public void AddNotification(Notification notification)
        {
            _db.Notifications.Add(notification);
        }

        public Notification GetNotificationById(int id)
        {
            return _db.Notifications.Include(n => n.ChallengeId).SingleOrDefault(c => c.Id == id);
        }

        public void Save()
        {
            _db.SaveChanges();
        }

        public async Task SaveAsync()
        {
            await _db.SaveChangesAsync();
        }
    }
}