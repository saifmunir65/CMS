using System.Collections.Generic;

namespace MagniCollegeManagementSystem.DTOs
{
    public class SubjectDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public int CreditHours { get; set; }
        public virtual TeacherDTO Teacher { get; set; }
        public virtual CourseDTO Course { get; set; }
        public List<int> Students { get; set; }
    }
}