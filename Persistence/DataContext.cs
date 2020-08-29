using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }

        //public DbSet<Student> Students { get; set; }

        public DbSet<Student> Students { get; set; }

        //  public DbSet<Note> Notes { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            // builder.Entity<Student>()
            // .HasData(
            //     new Student { Name = "Ehsan", Address = "11 Harold Road", Phone = "123456" },
            //     new Student { Name = "Mahsa", Address = "22 Hastings Road", Phone = "321654" },
            //     new Student { Name = "Poyan ", Address = "44 Denzil Avenue", Phone = "789987" },
            //     new Student { Name = "Sam", Address = "10 Tessa Court", Phone = "456654" },
            //     new Student { Name = "Dash", Address = "9 Cindy Court", Phone = "987123" }
            // );
        }


    }
}