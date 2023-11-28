using System.Collections.Generic;
using System.Linq;
using DataAccess.Models;
using DataAccess.DatabseContexts;
using System.Data.Entity;
using System.Threading.Tasks;
using DataAccess.Repositories.Interfaces;

namespace DataAccess.Repositories.Implementations
{
    public  class SubjectRepository: ISubjectRepository
    {
        private readonly MagniDBContext dbContext;
        public SubjectRepository(MagniDBContext db)
        {
            dbContext = db;
        }
        public Task<List<Subject>> GetAll()
        {
            return dbContext.Subjects
                .Include(x => x.Students)
                .ToListAsync();
        }

        public Task<Subject> Get(int id)
        {
            return dbContext.Subjects.FindAsync(id);
        }

        public Task<int> Delete(Subject Subject)
        {
            dbContext.Subjects.Remove(Subject);
            return dbContext.SaveChangesAsync();
        }

        public Task<int> Add(Subject Subject)
        {
            dbContext.Entry(Subject).State = EntityState.Modified;
            dbContext.Subjects.Add(Subject);
            return dbContext.SaveChangesAsync();
        }

        public Task<int> Update(Subject subject)
        {
            dbContext.Entry(subject).State = EntityState.Modified;
            return dbContext.SaveChangesAsync();
        }
    }
}
