using System;

namespace Domain
{
    public class Note
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public byte ProgressRating { get; set; }

        public string ExtraNote { get; set; }

        public DateTime DateAdded { get; set; }

        public Student Student { get; set; }

        public int StudentId { get; set; }
    }
}