using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class StudentTempsRenamedToStudent : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
         name: "Students",
         columns: table => new
         {
             Id = table.Column<Guid>(nullable: false),
             Name = table.Column<string>(nullable: true),
             Address = table.Column<string>(nullable: true),
             Phone = table.Column<string>(nullable: true)
         },
         constraints: table =>
         {
             table.PrimaryKey("PK_StudentTemps", x => x.Id);
         });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.DropTable(
                            name: "Students");
        }
    }
}
