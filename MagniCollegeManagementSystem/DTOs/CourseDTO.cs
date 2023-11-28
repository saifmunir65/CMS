using System.Collections.Generic;

namespace MagniCollegeManagementSystem.DTOs
{
    public class CourseDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public int TotalCreditHours { get; set; }
        public List<int> Students { get; set; }
        public List<int> Subjects { get; set; }
        public List<int> Teachers { get; set; }
    }
}