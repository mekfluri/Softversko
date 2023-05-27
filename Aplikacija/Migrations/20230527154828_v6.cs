using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Aplikacija.Migrations
{
    /// <inheritdoc />
    public partial class v6 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Literatura_Student_StudentId",
                table: "Literatura");

            migrationBuilder.DropIndex(
                name: "IX_Literatura_StudentId",
                table: "Literatura");

            migrationBuilder.DropColumn(
                name: "StudentId",
                table: "Literatura");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Literatura",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddForeignKey(
                name: "FK_Literatura_Student_Id",
                table: "Literatura",
                column: "Id",
                principalTable: "Student",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Literatura_Student_Id",
                table: "Literatura");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Literatura",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<int>(
                name: "StudentId",
                table: "Literatura",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Literatura_StudentId",
                table: "Literatura",
                column: "StudentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Literatura_Student_StudentId",
                table: "Literatura",
                column: "StudentId",
                principalTable: "Student",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
