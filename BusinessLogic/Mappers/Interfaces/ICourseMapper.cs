using DataAccess.Models;
using BusinessLogic.DTOs;

namespace BusinessLogic.Interfaces
{
    public  interface ICourseMapper
    {
        Course Map(Course scourse, CourseDTO source);
        CourseDTO Map(Course source);
    }
}