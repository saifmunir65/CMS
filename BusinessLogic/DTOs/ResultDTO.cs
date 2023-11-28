namespace BusinessLogic.DTOs
{
    public class ResultDTO : BaseDTO
    {
        public virtual CourseDTO Course  { get; set; }
        public virtual StudentDTO Student { get; set; }
        public virtual SubjectDTO Subject { get; set; }
        public int ObtainedMarks { get; set; }
        public virtual GradeDTO Grade { get; set; }
    }
}