using System;
using System.Collections.Generic;

namespace Domain
{
    public class Student
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Address { get; set; }

        public string Phone { get; set; }

        public int Rate { get; set; }

        public ICollection<Note> Notes { get; set; }

        public AppUser AppUser { get; set; }

        public Guid AppUserId { get; set; }

    }
}