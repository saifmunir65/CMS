using DataAccess.Models;

namespace DataAccess.Repositories.Interfaces
{
    public class SubjectDAL : BaseDAL<Subject>, ISubjectDAL
    {
        public SubjectDAL(IRepository<Subject> repository) : base(repository) { }
    }
}
