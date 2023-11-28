using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataAccess.Models
{
    public class Teacher
    {
        public int Id { get; set; }
        public string Name { get; set; }
        [Column(TypeName = "Date")]
        public DateTime Birthday { get; set; }
        public decimal Salary { get; set; }
        public virtual ICollection<Subject> Subjects { get; set; }
        public virtual ICollection<Course> Courses { get; set; }
    }
}