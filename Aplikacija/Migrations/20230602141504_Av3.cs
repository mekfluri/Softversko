using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Aplikacija.Migrations
{
    /// <inheritdoc />
    public partial class Av3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Zahtev_Mentor_MentorId",
                table: "Zahtev");

            migrationBuilder.AlterColumn<int>(
                name: "MentorId",
                table: "Zahtev",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Zahtev_Mentor_MentorId",
                table: "Zahtev",
                column: "MentorId",
                principalTable: "Mentor",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Zahtev_Mentor_MentorId",
                table: "Zahtev");

            migrationBuilder.AlterColumn<int>(
                name: "MentorId",
                table: "Zahtev",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Zahtev_Mentor_MentorId",
                table: "Zahtev",
                column: "MentorId",
                principalTable: "Mentor",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
