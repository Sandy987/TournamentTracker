using TournamentTracker.Models;
using TournamentTracker.Services.Interfaces;
using TournamentTracker.Data;
using System.Linq;
using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace TournamentTracker.Services 
{
    public class ChallengeService : IChallengeService
    {
        private TournamentTrackerDbContext _db; 

        public ChallengeService(TournamentTrackerDbContext context)
        {
            _db = context;
        }

        public void AddChallenge(Challenge challenge)
        {
            _db.Challenges.Add(challenge);
        }

        public Challenge GetChallengeById(int id)
        {
            return _db.Challenges.Include(c => c.Match.PlayerOne)
                                 .Include(c => c.Match.PlayerTwo)
                                 .Include(c => c.SendingPlayer)
                                 .Include(c => c.ReceivingPlayer)
                                 .Include(c => c.Notifications)
                                 .SingleOrDefault(c => c.Id == id);
        }

        public Challenge GetChallengeByMatchId(int id)
        {
            return _db.Challenges.Include(c => c.Match)
                                 .Include(c => c.SendingPlayer)
                                 .Include(c => c.ReceivingPlayer)
                                 .SingleOrDefault(c => c.MatchId == id);
        }

        public IEnumerable<Challenge> GetChallengesByPlayerId(string playerId)
        {
            return _db.Challenges.Include(c => c.Match)
                                 .Include(c => c.SendingPlayer)
                                 .Include(c => c.ReceivingPlayer)
                                 .Where(c => c.SendingPlayerId == playerId || c.ReceivingPlayerId == playerId);
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