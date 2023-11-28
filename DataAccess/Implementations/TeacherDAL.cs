using DataAccess.Models;

namespace DataAccess.Repositories.Interfaces
{
    public class TeacherDAL : BaseDAL<Teacher>, ITeacherDAL
    {
        public TeacherDAL(IRepository<Teacher> repository) : base(repository) { }
    }
}
