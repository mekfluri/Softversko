using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Aplikacija.Migrations
{
    /// <inheritdoc />
    public partial class V6 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Datumi_Kalendari_KalendarId",
                table: "Datumi");

            migrationBuilder.RenameColumn(
                name: "KalendarId",
                table: "Datumi",
                newName: "kalendarId");

            migrationBuilder.RenameIndex(
                name: "IX_Datumi_KalendarId",
                table: "Datumi",
                newName: "IX_Datumi_kalendarId");

            migrationBuilder.AlterColumn<int>(
                name: "kalendarId",
                table: "Datumi",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Datumi_Kalendari_kalendarId",
                table: "Datumi",
                column: "kalendarId",
                principalTable: "Kalendari",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Datumi_Kalendari_kalendarId",
                table: "Datumi");

            migrationBuilder.RenameColumn(
                name: "kalendarId",
                table: "Datumi",
                newName: "KalendarId");

            migrationBuilder.RenameIndex(
                name: "IX_Datumi_kalendarId",
                table: "Datumi",
                newName: "IX_Datumi_KalendarId");

            migrationBuilder.AlterColumn<int>(
                name: "KalendarId",
                table: "Datumi",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Datumi_Kalendari_KalendarId",
                table: "Datumi",
                column: "KalendarId",
                principalTable: "Kalendari",
                principalColumn: "Id");
        }
    }
}
