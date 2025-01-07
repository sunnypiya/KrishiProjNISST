﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KrishiProj.Migrations
{
    public partial class RegistrationModelV2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "AppointmentDateTime",
                table: "Registerations",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "IsAppointmentAssigned",
                table: "Registerations",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AppointmentDateTime",
                table: "Registerations");

            migrationBuilder.DropColumn(
                name: "IsAppointmentAssigned",
                table: "Registerations");
        }
    }
}
