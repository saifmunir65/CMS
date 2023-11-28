using System.Collections.Generic;

namespace BusinessLogic.DTOs
{
    public class StudentDTO : BaseDTO
    {
        public string Name { get; set; }
        public string Birthday { get; set; }
        public string RegisterationNumber { get; set; }
        public CourseDTO Course { get; set; }
        public List<int> Subjects { get; set; }
        public List<int> Results { get; set; }
    }
}