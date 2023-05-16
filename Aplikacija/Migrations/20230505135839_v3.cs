using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Aplikacija.Migrations
{
    /// <inheritdoc />
    public partial class v3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Datum_Kalendari_KalendarId",
                table: "Datum");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Datum",
                table: "Datum");

            migrationBuilder.RenameTable(
                name: "Datum",
                newName: "Datumi");

            migrationBuilder.RenameIndex(
                name: "IX_Datum_KalendarId",
                table: "Datumi",
                newName: "IX_Datumi_KalendarId");

            migrationBuilder.AlterColumn<string>(
                name: "Modul",
                table: "Predmeti",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Datumi",
                table: "Datumi",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Datumi_Kalendari_KalendarId",
                table: "Datumi",
                column: "KalendarId",
                principalTable: "Kalendari",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Datumi_Kalendari_KalendarId",
                table: "Datumi");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Datumi",
                table: "Datumi");

            migrationBuilder.RenameTable(
                name: "Datumi",
                newName: "Datum");

            migrationBuilder.RenameIndex(
                name: "IX_Datumi_KalendarId",
                table: "Datum",
                newName: "IX_Datum_KalendarId");

            migrationBuilder.AlterColumn<int>(
                name: "Modul",
                table: "Predmeti",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Datum",
                table: "Datum",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Datum_Kalendari_KalendarId",
                table: "Datum",
                column: "KalendarId",
                principalTable: "Kalendari",
                principalColumn: "Id");
        }
    }
}
