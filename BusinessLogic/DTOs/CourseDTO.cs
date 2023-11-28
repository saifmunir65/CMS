using System.Collections.Generic;

namespace BusinessLogic.DTOs
{
    public class CourseDTO: BaseDTO
    {
        public string Name { get; set; }
        public string Code { get; set; }
        public int TotalCreditHours { get; set; }
        public List<int> Students { get; set; }
        public List<int> Subjects { get; set; }
        public List<int> Teachers { get; set; }
    }
}