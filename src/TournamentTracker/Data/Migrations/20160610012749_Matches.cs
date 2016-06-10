using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace TournamentTracker.Data.Migrations
{
    public partial class Matches : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Matches",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    MatchCompletion = table.Column<DateTime>(nullable: false),
                    MatchStatus = table.Column<int>(nullable: false),
                    MatchWinnerId = table.Column<int>(nullable: false),
                    PlayerOneId = table.Column<int>(nullable: false),
                    PlayerOneId1 = table.Column<string>(nullable: true),
                    PlayerOneScore = table.Column<int>(nullable: false),
                    PlayerTwoId = table.Column<int>(nullable: false),
                    PlayerTwoId1 = table.Column<string>(nullable: true),
                    PlayerTwoScore = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Matches", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Matches_AspNetUsers_PlayerOneId1",
                        column: x => x.PlayerOneId1,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Matches_AspNetUsers_PlayerTwoId1",
                        column: x => x.PlayerTwoId1,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Matches_PlayerOneId1",
                table: "Matches",
                column: "PlayerOneId1");

            migrationBuilder.CreateIndex(
                name: "IX_Matches_PlayerTwoId1",
                table: "Matches",
                column: "PlayerTwoId1");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Matches");
        }
    }
}
