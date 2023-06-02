using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Aplikacija.Migrations
{
    /// <inheritdoc />
    public partial class Av1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PredmetId",
                table: "Literatura",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Literatura_PredmetId",
                table: "Literatura",
                column: "PredmetId");

            migrationBuilder.AddForeignKey(
                name: "FK_Literatura_Predmeti_PredmetId",
                table: "Literatura",
                column: "PredmetId",
                principalTable: "Predmeti",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Literatura_Predmeti_PredmetId",
                table: "Literatura");

            migrationBuilder.DropIndex(
                name: "IX_Literatura_PredmetId",
                table: "Literatura");

            migrationBuilder.DropColumn(
                name: "PredmetId",
                table: "Literatura");
        }
    }
}
