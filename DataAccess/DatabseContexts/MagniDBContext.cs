using System.Collections.Generic;
using System.Data.Entity;
using DataAccess.Models;

namespace DataAccess.DatabseContexts
{
    public class MagniDBContext : DbContext
    {
        public DbSet<Student> Students { get; set; }
        public DbSet<Teacher> Teachers { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Grade> Grades { get; set; }
        public DbSet<Result> Results { get; set; }

        public static MagniDBContext Create()
        {
            return new MagniDBContext();
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
           
        }
    }
}