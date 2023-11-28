using System.Collections.Generic;
using DataAccess.Models;
using DataAccess.DatabseContexts;
using System.Data.Entity;
using System.Threading.Tasks;
using DataAccess.Repositories.Interfaces;

namespace DataAccess.Repositories.Implementations
{
    public  class StudentRepository: IStudentRepository
    {
        private readonly MagniDBContext dbContext;
        public StudentRepository(MagniDBContext db)
        {
            dbContext = db;
        }
        public Task<List<Student>> GetAll()
        {
            return dbContext.Students
                .Include(x => x.Subjects)
                .ToListAsync();
        }

        public Task<Student> Get(int id)
        {
            return dbContext.Students.FindAsync(id);
        }

        public  Task<int> Delete(Student student)
        {
            dbContext.Students.Remove(student);
            return dbContext.SaveChangesAsync();
        }

        public async Task<int> Add(Student student)
        {
            dbContext.Entry(student).State = EntityState.Modified;
            dbContext.Students.Add(student);
            await dbContext.SaveChangesAsync();
            student.RegisterationNumber = student.Course.Code +"-"+ student.Id;
            return await Update(student);
        }

        public Task<int> Update(Student student)
        {
            dbContext.Entry(student).State = EntityState.Modified;
            return dbContext.SaveChangesAsync();
        }
    }
}
