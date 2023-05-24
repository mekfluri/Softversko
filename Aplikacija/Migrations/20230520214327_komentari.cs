using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Aplikacija.Migrations
{
    /// <inheritdoc />
    public partial class komentari : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Student_Moduli_ModulId",
                table: "Student");

            migrationBuilder.AddForeignKey(
                name: "FK_Student_Moduli_ModulId",
                table: "Student",
                column: "ModulId",
                principalTable: "Moduli",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Student_Moduli_ModulId",
                table: "Student");

            migrationBuilder.AddForeignKey(
                name: "FK_Student_Moduli_ModulId",
                table: "Student",
                column: "ModulId",
                principalTable: "Moduli",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
