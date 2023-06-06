using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Aplikacija.Migrations
{
    /// <inheritdoc />
    public partial class noveMigracije23 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Preference_Student_StudentId",
                table: "Preference");

            migrationBuilder.DropIndex(
                name: "IX_Preference_StudentId",
                table: "Preference");

            migrationBuilder.DropColumn(
                name: "StudentId",
                table: "Preference");

            migrationBuilder.CreateTable(
                name: "PreferenceStudent",
                columns: table => new
                {
                    PreferenceId = table.Column<int>(type: "int", nullable: false),
                    StudentiId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PreferenceStudent", x => new { x.PreferenceId, x.StudentiId });
                    table.ForeignKey(
                        name: "FK_PreferenceStudent_Preference_PreferenceId",
                        column: x => x.PreferenceId,
                        principalTable: "Preference",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PreferenceStudent_Student_StudentiId",
                        column: x => x.StudentiId,
                        principalTable: "Student",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PreferenceStudent_StudentiId",
                table: "PreferenceStudent",
                column: "StudentiId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PreferenceStudent");

            migrationBuilder.AddColumn<int>(
                name: "StudentId",
                table: "Preference",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Preference_StudentId",
                table: "Preference",
                column: "StudentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Preference_Student_StudentId",
                table: "Preference",
                column: "StudentId",
                principalTable: "Student",
                principalColumn: "Id");
        }
    }
}
