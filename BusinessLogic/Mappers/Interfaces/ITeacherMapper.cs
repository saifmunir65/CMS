using DataAccess.Models;
using BusinessLogic.DTOs;

namespace BusinessLogic.Interfaces
{
    public  interface ITeacherMapper
    {
        Teacher Map(Teacher Teacher, TeacherDTO source);
        TeacherDTO Map(Teacher source);
    }
}