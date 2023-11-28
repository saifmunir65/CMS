using DataAccess.Models;

namespace DataAccess.Repositories.Interfaces
{
    public class GradeDAL : BaseDAL<Grade>, IGradeDAL
    {
        public GradeDAL(IRepository<Grade> repository) : base(repository) { }
    }
}