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
            if (!context.Notes.Any())
            {
                var notes = new List<Note>
                {
                    new Note
                    {
                        Name = "Roundabouts",
                        ProgressRating = 5,
                        ExtraNote = "Needs More Work",
                        DateAdded = DateTime.Now.AddMonths(-2),
                        StudentId = 1,
                    },
                      new Note
                    {
                        Name = "Junctions",
                        ProgressRating = 6,
                        ExtraNote = "Needs More Work",
                        DateAdded = DateTime.Now.AddMonths(-1),
                        StudentId = 1,
                    },
                      new Note
                    {
                        Name = "Moving Off",
                        ProgressRating = 7,
                        ExtraNote = "Needs More Work",
                        DateAdded = DateTime.Now.AddMonths(-3),
                        StudentId = 1,
                    },
                      new Note
                    {
                        Name = "Emergency Stop",
                        ProgressRating = 8,
                        ExtraNote = "Needs More Work",
                        DateAdded = DateTime.Now.AddMonths(-4),
                        StudentId = 2,
                    },
                      new Note
                    {
                        Name = "Parking",
                        ProgressRating = 9,
                        ExtraNote = "Good",
                        DateAdded = DateTime.Now.AddMonths(-5),
                        StudentId = 3,
                    },
                      new Note
                    {
                        Name = "Reversing",
                        ProgressRating = 10,
                        ExtraNote = "Very Good",
                        DateAdded = DateTime.Now.AddMonths(-6),
                        StudentId = 4,
                    },
                      new Note
                    {
                        Name = "Mirror Checks",
                        ProgressRating = 2,
                        ExtraNote = "Not Good",
                        DateAdded = DateTime.Now.AddMonths(-2),
                        StudentId = 5,
                    },
                       new Note
                    {
                        Name = "Emergency Stop",
                        ProgressRating = 8,
                        ExtraNote = "Needs More Work",
                        DateAdded = DateTime.Now.AddMonths(-4),
                        StudentId = 4,
                    },
                      new Note
                    {
                        Name = "Parking",
                        ProgressRating = 9,
                        ExtraNote = "Good",
                        DateAdded = DateTime.Now.AddMonths(-5),
                        StudentId = 5,
                    },
                      new Note
                    {
                        Name = "Reversing",
                        ProgressRating = 10,
                        ExtraNote = "Very Good",
                        DateAdded = DateTime.Now.AddMonths(-6),
                        StudentId = 2,
                    },
                      new Note
                    {
                        Name = "Mirror Checks",
                        ProgressRating = 2,
                        ExtraNote = "Not Good",
                        DateAdded = DateTime.Now.AddMonths(-2),
                        StudentId = 3,
                    },

                };

                context.Notes.AddRange(notes);
                context.SaveChanges();
            }
        }
    }
}