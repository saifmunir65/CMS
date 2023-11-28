using System.Collections.Generic;

namespace BusinessLogic.DTOs
{
    public class GradeDTO : BaseDTO
    {
        public string Title { get; set; }
        public int StartingMarks { get; set; }
        public int EndingMarks { get; set; }
        public CourseDTO Course { get; set; }
    }
}