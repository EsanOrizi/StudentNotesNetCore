using System;

namespace Domain
{
    public class Note
    {
        public Guid Id { get; set; }

        public String Name { get; set; }

        public String ProgressRating { get; set; }

        public String ExtraNote { get; set; }

        public DateTime DateAdded { get; set; }

        public Student Student { get; set; }

        public Guid StudentId { get; set; }

    }
}