using System;
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
            migrationBuilder.CreateTable(
                name: "Moduli",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Moduli", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Tagovi",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tagovi", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Student",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Privilegije = table.Column<int>(type: "int", nullable: false),
                    Salt = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Bio = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    username = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ModulId = table.Column<int>(type: "int", nullable: true),
                    semestar = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Student", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Student_Moduli_ModulId",
                        column: x => x.ModulId,
                        principalTable: "Moduli",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Kalendari",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kalendari", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Kalendari_Student_Id",
                        column: x => x.Id,
                        principalTable: "Student",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

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
                name: "Note",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StudentId = table.Column<int>(type: "int", nullable: false),
                    Text = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    doneVisible = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Note", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Note_Student_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Student",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Datumi",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Poruka = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OznacenDatum = table.Column<DateTime>(type: "datetime2", nullable: false),
                    kalendarId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Datumi", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Datumi_Kalendari_kalendarId",
                        column: x => x.kalendarId,
                        principalTable: "Kalendari",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Administrator",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Administrator", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Administrator_Mentor_Id",
                        column: x => x.Id,
                        principalTable: "Mentor",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Predmeti",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ModulId = table.Column<int>(type: "int", nullable: true),
                    Semestar = table.Column<int>(type: "int", nullable: false),
                    ESPB = table.Column<int>(type: "int", nullable: false),
                    Opis = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MentorId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Predmeti", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Predmeti_Mentor_MentorId",
                        column: x => x.MentorId,
                        principalTable: "Mentor",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Predmeti_Moduli_ModulId",
                        column: x => x.ModulId,
                        principalTable: "Moduli",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Komentari",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StudentId = table.Column<int>(type: "int", nullable: false),
                    PredmetId = table.Column<int>(type: "int", nullable: false),
                    Text = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Komentari", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Komentari_Predmeti_PredmetId",
                        column: x => x.PredmetId,
                        principalTable: "Predmeti",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Komentari_Student_StudentId",
                        column: x => x.StudentId,
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
                    StudentId = table.Column<int>(type: "int", nullable: true),
                    MentorId = table.Column<int>(type: "int", nullable: true),
                    filePath = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PredmetId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Literatura", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Literatura_Mentor_MentorId",
                        column: x => x.MentorId,
                        principalTable: "Mentor",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Literatura_Predmeti_PredmetId",
                        column: x => x.PredmetId,
                        principalTable: "Predmeti",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Literatura_Student_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Student",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Ocene",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DostupnostMaterijala = table.Column<int>(type: "int", nullable: false),
                    AngazovanjeProfesora = table.Column<int>(type: "int", nullable: false),
                    LaboratorijskeVezbe = table.Column<int>(type: "int", nullable: false),
                    TezinaPredmeta = table.Column<int>(type: "int", nullable: false),
                    PrakticnoZnanje = table.Column<int>(type: "int", nullable: false),
                    PredmetId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ocene", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Ocene_Predmeti_PredmetId",
                        column: x => x.PredmetId,
                        principalTable: "Predmeti",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "PredmetTag",
                columns: table => new
                {
                    PredmetiId = table.Column<int>(type: "int", nullable: false),
                    TagoviId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PredmetTag", x => new { x.PredmetiId, x.TagoviId });
                    table.ForeignKey(
                        name: "FK_PredmetTag_Predmeti_PredmetiId",
                        column: x => x.PredmetiId,
                        principalTable: "Predmeti",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PredmetTag_Tagovi_TagoviId",
                        column: x => x.TagoviId,
                        principalTable: "Tagovi",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Zahtev",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    MentorId = table.Column<int>(type: "int", nullable: false),
                    Odobren = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Zahtev", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Zahtev_Literatura_Id",
                        column: x => x.Id,
                        principalTable: "Literatura",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Zahtev_Mentor_MentorId",
                        column: x => x.MentorId,
                        principalTable: "Mentor",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Preference",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TagId = table.Column<int>(type: "int", nullable: false),
                    OcenaId = table.Column<int>(type: "int", nullable: false),
                    StudentId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Preference", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Preference_Ocene_OcenaId",
                        column: x => x.OcenaId,
                        principalTable: "Ocene",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Preference_Student_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Student",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Preference_Tagovi_TagId",
                        column: x => x.TagId,
                        principalTable: "Tagovi",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Datumi_kalendarId",
                table: "Datumi",
                column: "kalendarId");

            migrationBuilder.CreateIndex(
                name: "IX_Komentari_PredmetId",
                table: "Komentari",
                column: "PredmetId");

            migrationBuilder.CreateIndex(
                name: "IX_Komentari_StudentId",
                table: "Komentari",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_Literatura_MentorId",
                table: "Literatura",
                column: "MentorId");

            migrationBuilder.CreateIndex(
                name: "IX_Literatura_PredmetId",
                table: "Literatura",
                column: "PredmetId");

            migrationBuilder.CreateIndex(
                name: "IX_Literatura_StudentId",
                table: "Literatura",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_Note_StudentId",
                table: "Note",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_Ocene_PredmetId",
                table: "Ocene",
                column: "PredmetId");

            migrationBuilder.CreateIndex(
                name: "IX_Predmeti_MentorId",
                table: "Predmeti",
                column: "MentorId");

            migrationBuilder.CreateIndex(
                name: "IX_Predmeti_ModulId",
                table: "Predmeti",
                column: "ModulId");

            migrationBuilder.CreateIndex(
                name: "IX_PredmetTag_TagoviId",
                table: "PredmetTag",
                column: "TagoviId");

            migrationBuilder.CreateIndex(
                name: "IX_Preference_OcenaId",
                table: "Preference",
                column: "OcenaId");

            migrationBuilder.CreateIndex(
                name: "IX_Preference_StudentId",
                table: "Preference",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_Preference_TagId",
                table: "Preference",
                column: "TagId");

            migrationBuilder.CreateIndex(
                name: "IX_Student_ModulId",
                table: "Student",
                column: "ModulId");

            migrationBuilder.CreateIndex(
                name: "IX_Zahtev_MentorId",
                table: "Zahtev",
                column: "MentorId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Administrator");

            migrationBuilder.DropTable(
                name: "Datumi");

            migrationBuilder.DropTable(
                name: "Komentari");

            migrationBuilder.DropTable(
                name: "Note");

            migrationBuilder.DropTable(
                name: "PredmetTag");

            migrationBuilder.DropTable(
                name: "Preference");

            migrationBuilder.DropTable(
                name: "Zahtev");

            migrationBuilder.DropTable(
                name: "Kalendari");

            migrationBuilder.DropTable(
                name: "Ocene");

            migrationBuilder.DropTable(
                name: "Tagovi");

            migrationBuilder.DropTable(
                name: "Literatura");

            migrationBuilder.DropTable(
                name: "Predmeti");

            migrationBuilder.DropTable(
                name: "Mentor");

            migrationBuilder.DropTable(
                name: "Student");

            migrationBuilder.DropTable(
                name: "Moduli");
        }
    }
}
