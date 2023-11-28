using System.Collections.Generic;
using DataAccess.Models;
using DataAccess.DatabseContexts;
using System.Data.Entity;
using System.Threading.Tasks;
using DataAccess.Repositories.Interfaces;

namespace DataAccess.Repositories.Implementations
{
    public  class CourseRepository: ICourseRepository
    {
        private readonly MagniDBContext dbContext;
        public CourseRepository(MagniDBContext db)
        {
            dbContext = db;
        }
        public Task<List<Course>> GetAll()
        {
            return dbContext.Courses
                .Include(x => x.Students)
                .Include(x => x.Subjects)
                .Include(x => x.Teachers)
                .ToListAsync();
        }

        public Task<Course> Get(int id)
        {
            return dbContext.Courses.FindAsync(id);
        }

        public Task<int> Delete(Course course)
        {
            dbContext.Courses.Remove(course);
            return dbContext.SaveChangesAsync();
        }

        public Task<int> Add(Course course)
        {
            dbContext.Entry(course).State = EntityState.Modified;
            dbContext.Courses.Add(course);
            return dbContext.SaveChangesAsync();
        }

        public Task<int> Update(Course course)
        {
            dbContext.Entry(course).State = EntityState.Modified;
            return dbContext.SaveChangesAsync();
        }
    }
}
