using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Student> Students { get; set; }

        public DbSet<Note> Notes { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Student>()
            .HasMany(s => s.Notes)
            .WithOne(n => n.Student)
            .IsRequired();
        }


    }
}