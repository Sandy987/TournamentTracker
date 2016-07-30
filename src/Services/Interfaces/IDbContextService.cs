using System.Threading.Tasks;

namespace TournamentTracker.Services.Interfaces 
{
    public interface IDbContextService {
        void Save();
        Task SaveAsync();
    }
}
