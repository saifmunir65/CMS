using DataAccess.Models;
using BusinessLogic.DTOs;

namespace BusinessLogic.Interfaces
{
    public  interface IStudentMapper
    {
        Student Map(Student student, StudentDTO source);
        StudentDTO Map(Student source);
    }
}