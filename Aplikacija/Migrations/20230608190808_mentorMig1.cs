using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Aplikacija.Migrations
{
    /// <inheritdoc />
    public partial class mentorMig1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MentorRequests",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StudentId = table.Column<int>(type: "int", nullable: false),
                    PredmetId = table.Column<int>(type: "int", nullable: false),
                    IndeksPhoto = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PredmetPhoto = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MentorRequests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MentorRequests_Predmeti_PredmetId",
                        column: x => x.PredmetId,
                        principalTable: "Predmeti",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MentorRequests_Student_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Student",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MentorRequests_PredmetId",
                table: "MentorRequests",
                column: "PredmetId");

            migrationBuilder.CreateIndex(
                name: "IX_MentorRequests_StudentId",
                table: "MentorRequests",
                column: "StudentId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MentorRequests");
        }
    }
}
