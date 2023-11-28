using DataAccess.Models;

namespace DataAccess.Repositories.Interfaces
{
    public class CourseDAL :  BaseDAL<Course>, ICourseDAL
    {
        public CourseDAL(IRepository<Course> repository) : base(repository) { }
    }
}
