using System.Collections.Generic;

namespace DataAccess.Models
{
    public class Course
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public int TotalCreditHours { get; set; }
        public virtual ICollection<Student> Students { get; set; }
        public virtual ICollection<Subject> Subjects { get; set; }
        public virtual ICollection<Teacher> Teachers { get; set; }
    }
}