using KrishiProj.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace KrishiProj.DataContexts
{
    public class DataContext : DbContext
    {
        private readonly IConfiguration _configuration;

        public DataContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            // connect to sql server with connection string from app settings
            options.UseSqlServer(_configuration.GetConnectionString("WebApiDatabase"));
        }

        public DbSet<Registeration> Registerations { get; set; }
        public DbSet<CommonConfigs> CommonConfigurations { get; set; }

    }
}
