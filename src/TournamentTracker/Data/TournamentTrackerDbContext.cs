﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TournamentTracker.Models;

namespace TournamentTracker.Data
{
    public class TournamentTrackerDbContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<Match> Matches {get; set;}
		public DbSet<ApplicationUser> Players {get; set;}
        public DbSet<Notification> Notifications {get; set;}
        public DbSet<Challenge> Challenges {get; set;}
        public TournamentTrackerDbContext(DbContextOptions<TournamentTrackerDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ApplicationUser>().
            HasMany(p => p.Matches).WithOne(m => m.PlayerOne);

            builder.Entity<ApplicationUser>().
            HasMany(p => p.Notifications).WithOne(m => m.ReceivingPlayer);

            builder.Entity<ApplicationUser>().
            HasMany(p => p.Challenges).WithOne(m => m.ReceivingPlayer);

             builder.Entity<ApplicationUser>().
             HasMany(p => p.Matches).WithOne(m => m.PlayerTwo);
            builder.Entity<Notification>().HasOne(m => m.Challenge)
                .WithMany(p => p.Notifications);

            // builder.Entity<ApplicationUser>().
            // HasMany(p => p.Matches).WithOne(m => m.PlayerTwo);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);
        }
    }
}
