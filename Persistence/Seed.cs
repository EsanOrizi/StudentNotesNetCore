using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {

            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        Id = "8b45979a-8e64-4874-a09e-48766a625cbb",
                        DisplayName = "Test",
                        UserName = "test",
                        Email = "test@test.com"
                    },
                      new AppUser
                    {
                        DisplayName = "Tom",
                        UserName = "tom",
                        Email = "tom@test.com"
                    },
                      new AppUser
                    {
                        DisplayName = "Jane",
                        UserName = "jane",
                        Email = "jane@test.com"
                    },
                };
                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }


            if (!context.Students.Any())
            {
                var students = new List<Student>
                {

                new Student { Id = Guid.Parse("08d854b0-480c-42f3-1f1b-549a5f4a2888"), Name = "Dan", Address = "11 Harold Road", Phone = "123456" , AppUserId = Guid.Parse("8b45979a-8e64-4874-a09e-48766a625cbb")}, 
                new Student { Id = Guid.Parse("1D0CB237-B440-460A-87B5-5FAE784E1EB9"),Name = "Amy", Address = "22 Hastings Road", Phone = "321654", AppUserId = Guid.Parse("8b45979a-8e64-4874-a09e-48766a625cbb")},
                new Student { Id = Guid.Parse("D7A3CDF6-E59C-454B-B527-DC833ABFD13A"),Name = "Peter", Address = "44 Denzil Avenue", Phone = "789987", AppUserId = Guid.Parse("8b45979a-8e64-4874-a09e-48766a625cbb")},
                new Student { Id = Guid.Parse("F2F9390C-9633-4E0F-8F03-946731523F28"),Name = "Sam", Address = "10 Tessa Court", Phone = "456654", AppUserId = Guid.Parse("8b45979a-8e64-4874-a09e-48766a625cbb")},
                new Student { Name = "Dash", Address = "9 Cindy Court", Phone = "987123", },

                };

                context.Students.AddRange(students);
                context.SaveChanges();
            }

            if (!context.Notes.Any())
            {
                var notes = new List<Note>
                {

                new Note { Name = "Stopping on the left", ProgressRating = "5", ExtraNote = "Need to do more" , DateAdded = DateTime.Now , StudentId = Guid.Parse("08d854b0-480c-42f3-1f1b-549a5f4a2888")},
                new Note { Name = "Stopping on the right", ProgressRating = "6", ExtraNote = "Ok for now" , DateAdded = DateTime.Now , StudentId = Guid.Parse("08d854b0-480c-42f3-1f1b-549a5f4a2888")},
                new Note { Name = "Junction turning left", ProgressRating = "7", ExtraNote = "Good" , DateAdded = DateTime.Now,  StudentId = Guid.Parse("08d854b0-480c-42f3-1f1b-549a5f4a2888")},

                new Note { Name = "Mini roundabouts", ProgressRating = "4", ExtraNote = "None" , DateAdded = DateTime.Now , StudentId = Guid.Parse("1D0CB237-B440-460A-87B5-5FAE784E1EB9")},
                new Note { Name = "Large roundabouts", ProgressRating = "8", ExtraNote = "Good" , DateAdded = DateTime.Now , StudentId = Guid.Parse("1D0CB237-B440-460A-87B5-5FAE784E1EB9")},
                new Note { Name = "Mirror checks", ProgressRating = "2", ExtraNote = "Bad, Mirrors to slow down not being checked" , DateAdded = DateTime.Now,  StudentId = Guid.Parse("1D0CB237-B440-460A-87B5-5FAE784E1EB9")},

                new Note { Name = "Dual carriageway", ProgressRating = "5", ExtraNote = "Do more next week" , DateAdded = DateTime.Now , StudentId = Guid.Parse("D7A3CDF6-E59C-454B-B527-DC833ABFD13A")},
                new Note { Name = "Motorway", ProgressRating = "7", ExtraNote = "Ok for now" , DateAdded = DateTime.Now , StudentId = Guid.Parse("D7A3CDF6-E59C-454B-B527-DC833ABFD13A")},
                new Note { Name = "Changing lanes", ProgressRating = "6", ExtraNote = "Need to do more" , DateAdded = DateTime.Now,  StudentId = Guid.Parse("D7A3CDF6-E59C-454B-B527-DC833ABFD13A")},

                new Note { Name = "Bay parking", ProgressRating = "5", ExtraNote = "Do more" , DateAdded = DateTime.Now , StudentId = Guid.Parse("F2F9390C-9633-4E0F-8F03-946731523F28")},
                new Note { Name = "Parallel parking", ProgressRating = "9", ExtraNote = "Good, check blind spots" , DateAdded = DateTime.Now , StudentId = Guid.Parse("F2F9390C-9633-4E0F-8F03-946731523F28")},
                new Note { Name = "Emergency stop", ProgressRating = "3", ExtraNote = "Bad, No need to check mirrors" , DateAdded = DateTime.Now,  StudentId = Guid.Parse("F2F9390C-9633-4E0F-8F03-946731523F28")},



                };

                context.Notes.AddRange(notes);
                context.SaveChanges();
            }
        }
    }
}