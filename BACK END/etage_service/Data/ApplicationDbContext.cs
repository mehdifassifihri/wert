
using etage_service.Models;
using Microsoft.EntityFrameworkCore;

namespace etage_service.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }


        public DbSet<Floor> Floors { get; set; }
    }
}