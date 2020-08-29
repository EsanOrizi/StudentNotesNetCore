using System;
using System.Collections.Generic;
using System.Linq;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static void SeedData(DataContext context)
        {
            if (!context.Students.Any())
            {
                var students = new List<Student>
                {

                new Student { Name = "Dan", Address = "11 Harold Road", Phone = "123456" },
                new Student { Name = "Amy", Address = "22 Hastings Road", Phone = "321654", },
                new Student { Name = "Peter", Address = "44 Denzil Avenue", Phone = "789987", },
                new Student { Name = "Sam", Address = "10 Tessa Court", Phone = "456654", },
                new Student { Name = "Dash", Address = "9 Cindy Court", Phone = "987123", },

                };

                context.Students.AddRange(students);
                context.SaveChanges();
            }
        }
    }
}