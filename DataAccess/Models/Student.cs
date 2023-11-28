using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataAccess.Models
{
    public class Student
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string RegisterationNumber { get; set; }
        [Column(TypeName = "Date")]
        public DateTime Birthday { get; set; }
        public virtual ICollection<Subject> Subjects { get; set; }
        public virtual ICollection<Result> Results { get; set; }
        public virtual  Course Course { get; set; }
    }
}