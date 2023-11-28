namespace MagniCollegeManagementSystem.DTOs
{
    public class ResultDTO
    {
        public int Id { get; set; }
        public virtual CourseDTO Course  { get; set; }
        public virtual StudentDTO Student { get; set; }
        public virtual SubjectDTO Subject { get; set; }
        public int ObtainedMarks { get; set; }
        public virtual GradeDTO Grade { get; set; }
    }
}