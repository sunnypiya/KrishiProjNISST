using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KrishiProj.Migrations
{
    public partial class RegistrationModelV3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AppointmentShift",
                table: "Registerations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AppointmentShift",
                table: "Registerations");
        }
    }
}
