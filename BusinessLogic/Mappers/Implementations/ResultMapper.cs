using DataAccess.Models;
using System.Linq;
using BusinessLogic.DTOs;
using BusinessLogic.Interfaces;
using DataAccess.DatabseContexts;

namespace BusinessLogic.Implementations
{
    public  class ResultMapper:IResultMapper
    {
        private MagniDBContext database;
        private ICourseMapper courseMapper;
        private IStudentMapper studentMapper;
        private ISubjectMapper subjectMapper;
        private IGradeMapper gradeMapper;

        public ResultMapper
        (
            MagniDBContext database, 
            ICourseMapper courseMapper,
            IStudentMapper studentMapper,
            ISubjectMapper subjectMapper,
            IGradeMapper gradeMapper)
        {
            this.database = database;
            this.courseMapper = courseMapper;
            this.studentMapper = studentMapper;
            this.subjectMapper = subjectMapper;
            this.gradeMapper = gradeMapper;
        }
        public  Result Map(Result Result, ResultDTO source)
        {
            if (source is null)
                return null;

            Result.ObtainedMarks = source.ObtainedMarks;

            if (!(source.Course is null))
            {
                Result.Course = database.Courses.FirstOrDefault
                (
                    x => x.Id.Equals(source.Course.Id)
                );
            }

            if (!(source.Student is null))
            {
                Result.Student = database.Students.FirstOrDefault
                (
                    x => x.Id.Equals(source.Student.Id)
                );
            }

            if (!(source.Subject is null))
            {
                Result.Subject = database.Subjects.FirstOrDefault
                (
                    x => x.Id.Equals(source.Subject.Id)
                );
            }

            if (!(source.Grade is null))
            {
                Result.Grade = database.Grades.FirstOrDefault
                (
                    x => x.Id.Equals(source.Grade.Id)
                );
            }


            return Result;
        }

        public  ResultDTO Map(Result source)
        {
            if (source is null)
                return null;


            var Result = new ResultDTO
            {
                Id = source.Id,
                ObtainedMarks=source.ObtainedMarks
            };
            if (!(source.Course is null))
                Result.Course = courseMapper.Map(source.Course);

            if (!(source.Student is null))
                Result.Student = studentMapper.Map(source.Student);

            if (!(source.Subject is null))
                Result.Subject = subjectMapper.Map(source.Subject);
            
            if (!(source.Grade is null))
                Result.Grade = gradeMapper.Map(source.Grade);

            return Result;
        }
    }
}