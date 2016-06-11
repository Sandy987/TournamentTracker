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

        public void AddNotification(Notification notification)
        {
            _db.Notifications.Add(notification);
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