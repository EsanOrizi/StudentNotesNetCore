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

                new Student { Id = Guid.Parse("08d854b0-480c-42f3-1f1b-549a5f4a2888"), Name = "Dan", Address = "11 Harold Road", Phone = "123456" },
                new Student { Name = "Amy", Address = "22 Hastings Road", Phone = "321654", },
                new Student { Name = "Peter", Address = "44 Denzil Avenue", Phone = "789987", },
                new Student { Name = "Sam", Address = "10 Tessa Court", Phone = "456654", },
                new Student { Name = "Dash", Address = "9 Cindy Court", Phone = "987123", },

                };

                context.Students.AddRange(students);
                context.SaveChanges();
            }

            if (!context.Notes.Any())
            {
                var notes = new List<Note>
                {

                new Note { Name = "stop", ProgressRating = 5, ExtraNote = "none" , DateAdded = DateTime.Now , StudentId = Guid.Parse("08d854b0-480c-42f3-1f1b-549a5f4a2888")},
                new Note { Name = "Go", ProgressRating = 7, ExtraNote = "ok for now" , DateAdded = DateTime.Now , StudentId = Guid.Parse("08d854b0-480c-42f3-1f1b-549a5f4a2888")},
                new Note { Name = "left", ProgressRating = 3, ExtraNote = "bad" , DateAdded = DateTime.Now,  StudentId = Guid.Parse("08d854b0-480c-42f3-1f1b-549a5f4a2888")},


                };

                context.Notes.AddRange(notes);
                context.SaveChanges();
            }
        }
    }
}