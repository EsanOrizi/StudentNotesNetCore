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
            .HasData(
                new Student { Id = 1, Name = "Ehsan", Address = "11 Harold Road", Phone = "123456" },
                new Student { Id = 2, Name = "Mahsa", Address = "22 Hastings Road", Phone = "321654" },
                new Student { Id = 3, Name = "Poyan ", Address = "44 Denzil Avenue", Phone = "789987" },
                new Student { Id = 4, Name = "Sam", Address = "10 Tessa Court", Phone = "456654" },
                new Student { Id = 5, Name = "Dash", Address = "9 Cindy Court", Phone = "987123" }
            );
        }


    }
}