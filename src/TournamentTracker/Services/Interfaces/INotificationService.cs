using TournamentTracker.Models;

namespace TournamentTracker.Services.Interfaces
{
    public interface INotificationService: IDbContextService
    {
        void AddNotification(Notification notification);
    }
}