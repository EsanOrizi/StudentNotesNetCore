using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class DeleteNote : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Notes");

            migrationBuilder.DeleteData(
                table: "Students",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Students",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Students",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Students",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Students",
                keyColumn: "Id",
                keyValue: 5);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Notes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    DateAdded = table.Column<DateTime>(type: "TEXT", nullable: false),
                    ExtraNote = table.Column<string>(type: "TEXT", nullable: true),
                    Name = table.Column<string>(type: "TEXT", nullable: true),
                    ProgressRating = table.Column<byte>(type: "INTEGER", nullable: false),
                    StudentId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Notes_Students_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Students",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Students",
                columns: new[] { "Id", "Address", "Name", "Phone" },
                values: new object[] { 1, "11 Harold Road", "Ehsan", "123456" });

            migrationBuilder.InsertData(
                table: "Students",
                columns: new[] { "Id", "Address", "Name", "Phone" },
                values: new object[] { 2, "22 Hastings Road", "Mahsa", "321654" });

            migrationBuilder.InsertData(
                table: "Students",
                columns: new[] { "Id", "Address", "Name", "Phone" },
                values: new object[] { 3, "44 Denzil Avenue", "Poyan ", "789987" });

            migrationBuilder.InsertData(
                table: "Students",
                columns: new[] { "Id", "Address", "Name", "Phone" },
                values: new object[] { 4, "10 Tessa Court", "Sam", "456654" });

            migrationBuilder.InsertData(
                table: "Students",
                columns: new[] { "Id", "Address", "Name", "Phone" },
                values: new object[] { 5, "9 Cindy Court", "Dash", "987123" });

            migrationBuilder.CreateIndex(
                name: "IX_Notes_StudentId",
                table: "Notes",
                column: "StudentId");
        }
    }
}
