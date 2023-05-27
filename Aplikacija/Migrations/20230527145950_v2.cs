using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Aplikacija.Migrations
{
    /// <inheritdoc />
    public partial class v2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MentorId",
                table: "Predmeti",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Mentor",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Mentor", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Mentor_Student_Id",
                        column: x => x.Id,
                        principalTable: "Student",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Literatura",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StudentId = table.Column<int>(type: "int", nullable: false),
                    MentorId = table.Column<int>(type: "int", nullable: false),
                    filePath = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Literatura", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Literatura_Mentor_MentorId",
                        column: x => x.MentorId,
                        principalTable: "Mentor",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Literatura_Student_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Student",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Predmeti_MentorId",
                table: "Predmeti",
                column: "MentorId");

            migrationBuilder.CreateIndex(
                name: "IX_Literatura_MentorId",
                table: "Literatura",
                column: "MentorId");

            migrationBuilder.CreateIndex(
                name: "IX_Literatura_StudentId",
                table: "Literatura",
                column: "StudentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Predmeti_Mentor_MentorId",
                table: "Predmeti",
                column: "MentorId",
                principalTable: "Mentor",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Predmeti_Mentor_MentorId",
                table: "Predmeti");

            migrationBuilder.DropTable(
                name: "Literatura");

            migrationBuilder.DropTable(
                name: "Mentor");

            migrationBuilder.DropIndex(
                name: "IX_Predmeti_MentorId",
                table: "Predmeti");

            migrationBuilder.DropColumn(
                name: "MentorId",
                table: "Predmeti");
        }
    }
}
