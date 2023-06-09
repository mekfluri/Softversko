using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Aplikacija.Migrations
{
    /// <inheritdoc />
    public partial class anjachat3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "procitana",
                table: "Poruka",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "procitana",
                table: "Poruka");
        }
    }
}
