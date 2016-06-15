using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TournamentTracker.Data.Migrations
{
    public partial class matchUpdate2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "MatchStatus",
                table: "Matches",
                nullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "MatchCompletion",
                table: "Matches",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "MatchStatus",
                table: "Matches",
                nullable: false);

            migrationBuilder.AlterColumn<DateTime>(
                name: "MatchCompletion",
                table: "Matches",
                nullable: false);
        }
    }
}
