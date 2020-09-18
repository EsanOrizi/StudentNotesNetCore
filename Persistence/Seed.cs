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
                new Student { Id = Guid.Parse("1D0CB237-B440-460A-87B5-5FAE784E1EB9"),Name = "Amy", Address = "22 Hastings Road", Phone = "321654", },
                new Student { Id = Guid.Parse("D7A3CDF6-E59C-454B-B527-DC833ABFD13A"),Name = "Peter", Address = "44 Denzil Avenue", Phone = "789987", },
                new Student { Id = Guid.Parse("F2F9390C-9633-4E0F-8F03-946731523F28"),Name = "Sam", Address = "10 Tessa Court", Phone = "456654", },
                new Student { Name = "Dash", Address = "9 Cindy Court", Phone = "987123", },

                };

                context.Students.AddRange(students);
                context.SaveChanges();
            }

            if (!context.Notes.Any())
            {
                var notes = new List<Note>
                {

                new Note { Name = "stop DAN", ProgressRating = 5, ExtraNote = "none" , DateAdded = DateTime.Now , StudentId = Guid.Parse("08d854b0-480c-42f3-1f1b-549a5f4a2888")},
                new Note { Name = "Go DAN", ProgressRating = 7, ExtraNote = "ok for now" , DateAdded = DateTime.Now , StudentId = Guid.Parse("08d854b0-480c-42f3-1f1b-549a5f4a2888")},
                new Note { Name = "left DAN", ProgressRating = 3, ExtraNote = "bad" , DateAdded = DateTime.Now,  StudentId = Guid.Parse("08d854b0-480c-42f3-1f1b-549a5f4a2888")},

                new Note { Name = "stop AMY", ProgressRating = 5, ExtraNote = "none" , DateAdded = DateTime.Now , StudentId = Guid.Parse("1D0CB237-B440-460A-87B5-5FAE784E1EB9")},
                new Note { Name = "Go AMY", ProgressRating = 7, ExtraNote = "ok for now" , DateAdded = DateTime.Now , StudentId = Guid.Parse("1D0CB237-B440-460A-87B5-5FAE784E1EB9")},
                new Note { Name = "left AMY", ProgressRating = 3, ExtraNote = "bad" , DateAdded = DateTime.Now,  StudentId = Guid.Parse("1D0CB237-B440-460A-87B5-5FAE784E1EB9")},

                new Note { Name = "stop PETER", ProgressRating = 5, ExtraNote = "none" , DateAdded = DateTime.Now , StudentId = Guid.Parse("D7A3CDF6-E59C-454B-B527-DC833ABFD13A")},
                new Note { Name = "Go PETER", ProgressRating = 7, ExtraNote = "ok for now" , DateAdded = DateTime.Now , StudentId = Guid.Parse("D7A3CDF6-E59C-454B-B527-DC833ABFD13A")},
                new Note { Name = "left PETER", ProgressRating = 3, ExtraNote = "bad" , DateAdded = DateTime.Now,  StudentId = Guid.Parse("D7A3CDF6-E59C-454B-B527-DC833ABFD13A")},

                new Note { Name = "stop SAM", ProgressRating = 5, ExtraNote = "none" , DateAdded = DateTime.Now , StudentId = Guid.Parse("F2F9390C-9633-4E0F-8F03-946731523F28")},
                new Note { Name = "Go SAM", ProgressRating = 7, ExtraNote = "ok for now" , DateAdded = DateTime.Now , StudentId = Guid.Parse("F2F9390C-9633-4E0F-8F03-946731523F28")},
                new Note { Name = "left SAM", ProgressRating = 3, ExtraNote = "bad" , DateAdded = DateTime.Now,  StudentId = Guid.Parse("F2F9390C-9633-4E0F-8F03-946731523F28")},



                };

                context.Notes.AddRange(notes);
                context.SaveChanges();
            }
        }
    }
}