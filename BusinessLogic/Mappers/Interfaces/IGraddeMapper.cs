using DataAccess.Models;
using BusinessLogic.DTOs;

namespace BusinessLogic.Interfaces
{
    public  interface IGradeMapper
    {
        Grade Map(Grade Grade, GradeDTO source);
        GradeDTO Map(Grade source);
    }
}