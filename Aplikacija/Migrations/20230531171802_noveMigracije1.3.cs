using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Aplikacija.Migrations
{
    /// <inheritdoc />
    public partial class noveMigracije13 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tagovi_Predmeti_PredmetId",
                table: "Tagovi");

            migrationBuilder.DropIndex(
                name: "IX_Tagovi_PredmetId",
                table: "Tagovi");

            migrationBuilder.DropColumn(
                name: "PredmetId",
                table: "Tagovi");

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

            migrationBuilder.CreateIndex(
                name: "IX_PredmetTag_TagoviId",
                table: "PredmetTag",
                column: "TagoviId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PredmetTag");

            migrationBuilder.AddColumn<int>(
                name: "PredmetId",
                table: "Tagovi",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tagovi_PredmetId",
                table: "Tagovi",
                column: "PredmetId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tagovi_Predmeti_PredmetId",
                table: "Tagovi",
                column: "PredmetId",
                principalTable: "Predmeti",
                principalColumn: "Id");
        }
    }
}
