using DataAccess.Models;
using System.Linq;
using System.Collections.Generic;
using BusinessLogic.DTOs;
using BusinessLogic.Interfaces;
using DataAccess.DatabseContexts;

namespace BusinessLogic.Implementations
{
    public  class SubjectMapper: ISubjectMapper
    {
        private MagniDBContext database;
        private ITeacherMapper teacherMapper;
        private ICourseMapper courseMapper;

        public SubjectMapper(MagniDBContext database, ICourseMapper courseMapper,ITeacherMapper teacherMapper)
        {
            this.database = database;
            this.courseMapper = courseMapper;
            this.teacherMapper = teacherMapper;
        }

        public  Subject Map(Subject subject, SubjectDTO source)
        {
            if (source is null)
                return null;

            subject.Id = source.Id;
            subject.Name = source.Name;
            subject.Code = source.Code;
            subject.CreditHours = source.CreditHours;
            subject.Students = new List<Student>();

            if (!(source.Teacher is null))
            {
                subject.Teacher = database.Teachers.FirstOrDefault
                (
                    x => x.Id.Equals(source.Teacher.Id)
                );
            }


            if (!(source.Course is null))
            {
                subject.Course = database.Courses.FirstOrDefault
                (
                    x => x.Id.Equals(source.Course.Id)
                );
            }

            if (!(source.Students is null))
            {
                var dbStudents = database.Students;
                subject.Students.Clear();
                foreach (var item in source.Students)
                {
                    subject.Students.Add(dbStudents.FirstOrDefault
                    (
                        x => x.Id.Equals(item)
                    ));
                }
            }
               

            return subject;
        }
        public  SubjectDTO Map(Subject source)
        {
            if (source is null)
                return null;

            var subject = new SubjectDTO
            {
                Id = source.Id,
                Name = source.Name,
                Code = source.Code,
                CreditHours = source.CreditHours,
                Students = new List<int>()
            };

            if (!(source.Teacher is null))
                subject.Teacher = teacherMapper.Map(source.Teacher);

            if (!(source.Course is null))
                subject.Course = courseMapper.Map(source.Course);

            if (!(source.Students is null))
                foreach (var item in source.Students)
                {
                    subject.Students.Add(item.Id);
                }

            return subject;
        }
    }
}