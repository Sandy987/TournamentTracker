using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TournamentTracker.Data.Migrations
{
    public partial class NotificationsChallengeRelation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ChallengeId",
                table: "Notifications",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_ChallengeId",
                table: "Notifications",
                column: "ChallengeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_Challenges_ChallengeId",
                table: "Notifications",
                column: "ChallengeId",
                principalTable: "Challenges",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_Challenges_ChallengeId",
                table: "Notifications");

            migrationBuilder.DropIndex(
                name: "IX_Notifications_ChallengeId",
                table: "Notifications");

            migrationBuilder.DropColumn(
                name: "ChallengeId",
                table: "Notifications");
        }
    }
}
