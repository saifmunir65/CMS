using DataAccess.Models;
using BusinessLogic.DTOs;

namespace BusinessLogic.Interfaces
{
    public  interface ISubjectMapper
    {
        Subject Map(Subject Subject, SubjectDTO source);
        SubjectDTO Map(Subject source);
    }
}