using System.Collections.Generic;
using DataAccess.Models;
using DataAccess.DatabseContexts;
using System.Data.Entity;
using System.Threading.Tasks;
using DataAccess.Repositories.Interfaces;

namespace DataAccess.Repositories.Implementations
{
    public  class TeacherRepository: ITeacherRepository
    {
        private readonly MagniDBContext dbContext;
        public TeacherRepository(MagniDBContext db)
        {
            dbContext = db;
        }
        public Task<List<Teacher>> GetAll()
        {
            return dbContext.Teachers
                .Include(x => x.Subjects)
                .Include(x => x.Courses)
                .ToListAsync();
        }

        public Task<Teacher> Get(int id)
        {
            return dbContext.Teachers.FindAsync(id);
        }

        public Task<int>Delete(Teacher teacher)
        {
            dbContext.Teachers.Remove(teacher);
            return dbContext.SaveChangesAsync();
        }

        public Task<int> Add(Teacher teacher)
        {
            dbContext.Entry(teacher).State = EntityState.Modified;
            dbContext.Teachers.Add(teacher);
            return dbContext.SaveChangesAsync();

        }

        public Task<int> Update(Teacher teacher)
        {
            dbContext.Teachers.Attach(teacher);
            dbContext.Entry(teacher).State = EntityState.Modified;
            return dbContext.SaveChangesAsync();
        }
    }
}
