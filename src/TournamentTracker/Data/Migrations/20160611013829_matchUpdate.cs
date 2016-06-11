using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TournamentTracker.Data.Migrations
{
    public partial class matchUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Matches_AspNetUsers_PlayerOneId1",
                table: "Matches");

            migrationBuilder.DropForeignKey(
                name: "FK_Matches_AspNetUsers_PlayerTwoId1",
                table: "Matches");

            migrationBuilder.DropIndex(
                name: "IX_Matches_PlayerOneId1",
                table: "Matches");

            migrationBuilder.DropIndex(
                name: "IX_Matches_PlayerTwoId1",
                table: "Matches");

            migrationBuilder.DropColumn(
                name: "PlayerOneId1",
                table: "Matches");

            migrationBuilder.DropColumn(
                name: "PlayerTwoId1",
                table: "Matches");

            migrationBuilder.AlterColumn<string>(
                name: "PlayerTwoId",
                table: "Matches",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "PlayerOneId",
                table: "Matches",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "MatchWinnerId",
                table: "Matches",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Matches_PlayerOneId",
                table: "Matches",
                column: "PlayerOneId");

            migrationBuilder.CreateIndex(
                name: "IX_Matches_PlayerTwoId",
                table: "Matches",
                column: "PlayerTwoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Matches_AspNetUsers_PlayerOneId",
                table: "Matches",
                column: "PlayerOneId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Matches_AspNetUsers_PlayerTwoId",
                table: "Matches",
                column: "PlayerTwoId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Matches_AspNetUsers_PlayerOneId",
                table: "Matches");

            migrationBuilder.DropForeignKey(
                name: "FK_Matches_AspNetUsers_PlayerTwoId",
                table: "Matches");

            migrationBuilder.DropIndex(
                name: "IX_Matches_PlayerOneId",
                table: "Matches");

            migrationBuilder.DropIndex(
                name: "IX_Matches_PlayerTwoId",
                table: "Matches");

            migrationBuilder.AlterColumn<int>(
                name: "PlayerTwoId",
                table: "Matches",
                nullable: false);

            migrationBuilder.AlterColumn<int>(
                name: "PlayerOneId",
                table: "Matches",
                nullable: false);

            migrationBuilder.AlterColumn<int>(
                name: "MatchWinnerId",
                table: "Matches",
                nullable: false);

            migrationBuilder.AddColumn<string>(
                name: "PlayerOneId1",
                table: "Matches",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PlayerTwoId1",
                table: "Matches",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Matches_PlayerOneId1",
                table: "Matches",
                column: "PlayerOneId1");

            migrationBuilder.CreateIndex(
                name: "IX_Matches_PlayerTwoId1",
                table: "Matches",
                column: "PlayerTwoId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Matches_AspNetUsers_PlayerOneId1",
                table: "Matches",
                column: "PlayerOneId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Matches_AspNetUsers_PlayerTwoId1",
                table: "Matches",
                column: "PlayerTwoId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
