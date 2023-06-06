using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Aplikacija.Migrations
{
    /// <inheritdoc />
    public partial class noveMigracije22 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Preference_Ocene_OcenaId",
                table: "Preference");

            migrationBuilder.DropIndex(
                name: "IX_Preference_OcenaId",
                table: "Preference");

            migrationBuilder.RenameColumn(
                name: "OcenaId",
                table: "Preference",
                newName: "Ocena");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Ocena",
                table: "Preference",
                newName: "OcenaId");

            migrationBuilder.CreateIndex(
                name: "IX_Preference_OcenaId",
                table: "Preference",
                column: "OcenaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Preference_Ocene_OcenaId",
                table: "Preference",
                column: "OcenaId",
                principalTable: "Ocene",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
