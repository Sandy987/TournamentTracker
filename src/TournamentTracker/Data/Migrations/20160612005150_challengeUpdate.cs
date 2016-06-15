using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using TournamentTracker.Models.Enumerations;

namespace TournamentTracker.Data.Migrations
{
    public partial class challengeUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "Challenges");

            migrationBuilder.AddColumn<int>(
                name: "ReceivingPlayerStatus",
                table: "Challenges",
                nullable: false,
                defaultValue: ChallengeStatus.Pending);

            migrationBuilder.AddColumn<int>(
                name: "SendingPlayerStatus",
                table: "Challenges",
                nullable: false,
                defaultValue: ChallengeStatus.Pending);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ReceivingPlayerStatus",
                table: "Challenges");

            migrationBuilder.DropColumn(
                name: "SendingPlayerStatus",
                table: "Challenges");

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Challenges",
                nullable: false,
                defaultValue: 0);
        }
    }
}
