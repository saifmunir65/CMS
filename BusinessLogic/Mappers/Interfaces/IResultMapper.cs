using DataAccess.Models;
using BusinessLogic.DTOs;

namespace BusinessLogic.Interfaces
{
    public  interface IResultMapper
    {
        Result Map(Result Result, ResultDTO source);
        ResultDTO Map(Result source);
    }
}