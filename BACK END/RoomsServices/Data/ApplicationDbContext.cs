using Microsoft.EntityFrameworkCore;
using rooms.Entity;

namespace rooms.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Room> Rooms { get; set; }
    }
}