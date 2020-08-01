using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class SeedStudentValues : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
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
    }
}
