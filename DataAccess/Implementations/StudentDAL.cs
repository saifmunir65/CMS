using DataAccess.Models;

namespace DataAccess.Repositories.Interfaces
{
    public class StudentDAL : BaseDAL<Student>, IStudentDAL
    {
        public StudentDAL(IRepository<Student> repository) : base(repository) { }
    }
}
