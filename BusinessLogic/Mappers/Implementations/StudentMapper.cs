using DataAccess.Models;
using System.Linq;
using System.Collections.Generic;
using DataAccess.DatabseContexts;
using System;
using BusinessLogic.DTOs;
using BusinessLogic.Interfaces;

namespace BusinessLogic.Implementations
{
    public class StudentMapper: IStudentMapper
    {
        private MagniDBContext database;
        private ICourseMapper courseMapper;

        public StudentMapper(MagniDBContext database, ICourseMapper courseMapper)
        {
            this.database = database;
            this.courseMapper = courseMapper;
        }
        public  Student Map(Student student, StudentDTO source)
        {
            if (source is null)
                return null;

            student.Id = source.Id;
            student.Name = source.Name;
            student.RegisterationNumber = source.RegisterationNumber;
            student.Birthday = DateTime.Parse(source.Birthday ?? null);
            student.Subjects = new List<Subject>();


            if (!(source.Course is null))
            {
                student.Course = database.Courses.FirstOrDefault
                (
                    x => x.Id.Equals(source.Course.Id)
                );
            }


            if (!(source.Subjects is null))
            {
                var dbSubjects = database.Subjects;
                student.Subjects.Clear();
                foreach (var item in source.Subjects)
                {
                    student.Subjects.Add(dbSubjects.FirstOrDefault
                    (
                        x => x.Id.Equals(item)
                    ));
                }
            }

            if (!(source.Results is null))
            {
                var dbResults = database.Results;
                student.Results.Clear();
                foreach (var item in source.Results)
                {
                    student.Results.Add(dbResults.FirstOrDefault
                    (
                        x => x.Id.Equals(item)
                    ));
                }
            }

            return student;
        }
        public  StudentDTO Map(Student source)
        {
            if (source is null)
                return null;

            var student = new StudentDTO
            {
                Id = source.Id,
                Name = source.Name,
                RegisterationNumber = source.RegisterationNumber,
                Birthday = source.Birthday.Date.ToString("yyyy-MM-dd"),
                Subjects = new List<int>(),
                Results = new List<int>(),

            };

            if (!(source.Course is null))
                student.Course = courseMapper.Map(source.Course);

            if (!(source.Subjects is null))
                foreach (var item in source.Subjects)
                {
                    student.Subjects.Add(item.Id);
                }

            if (!(source.Results is null))
                foreach (var item in source.Results)
                {
                    student.Results.Add(item.Id);
                }

            return student;
        }
    }
}