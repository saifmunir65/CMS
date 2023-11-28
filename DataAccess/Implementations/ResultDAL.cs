using DataAccess.Models;

namespace DataAccess.Repositories.Interfaces
{
    public class ResultDAL : BaseDAL<Result>, IResultDAL
    {
        public ResultDAL(IRepository<Result> repository) : base(repository) { }
    }
}
