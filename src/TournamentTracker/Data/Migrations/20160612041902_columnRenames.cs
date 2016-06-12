using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TournamentTracker.Data.Migrations
{
    public partial class columnRenames : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MatchCompletion",
                table: "Matches");

            migrationBuilder.DropColumn(
                name: "MatchStatus",
                table: "Matches");

            migrationBuilder.AddColumn<DateTime>(
                name: "CompletionDate",
                table: "Matches",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Matches",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CompletionDate",
                table: "Matches");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Matches");

            migrationBuilder.AddColumn<DateTime>(
                name: "MatchCompletion",
                table: "Matches",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MatchStatus",
                table: "Matches",
                nullable: true);
        }
    }
}
