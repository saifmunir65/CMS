using DataAccess.Models;
using System.Linq;
using System.Collections.Generic;
using BusinessLogic.DTOs;
using BusinessLogic.Interfaces;
using DataAccess.DatabseContexts;

namespace BusinessLogic.Implementations
{
    public class CourseMapper:ICourseMapper
    {
        private MagniDBContext database;
        public CourseMapper(MagniDBContext database)
        {
            this.database = database;
        }

        public Course Map(Course course, CourseDTO source)
        {
            if (source is null)
                return null;

            course.Id = source.Id;
            course.Name = source.Name;
            course.Code = source.Code;
            course.TotalCreditHours = source.TotalCreditHours;
            course.Students = new List<Student>();
            course.Subjects = new List<Subject>();
            course.Teachers = new List<Teacher>();


            if (!(source.Students is null))
            {
                var dbStudents = database.Students;
                course.Students.Clear();
                foreach (var item in source.Students)
                {
                    course.Students.Add(dbStudents.FirstOrDefault
                    (
                        x => x.Id.Equals(item)
                    ));
                }
            }


            if (!(source.Subjects is null))
            {
                var dbSubjects = database.Subjects;
                course.Subjects.Clear();
                foreach (var item in source.Subjects)
                {
                    course.Subjects.Add(dbSubjects.FirstOrDefault
                    (
                        x => x.Id.Equals(item)
                    ));
                }
            }

            if (!(source.Teachers is null))
            {
                var dbTeachers = database.Teachers;
                course.Teachers.Clear();
                foreach (var item in source.Teachers)
                {
                    course.Teachers.Add(dbTeachers.FirstOrDefault
                    (
                        x => x.Id.Equals(item)
                    ));
                }
            }

            return course;
        }

        public CourseDTO Map(Course source)
        {
            if (source is null)
                return null;

            var course = new CourseDTO
            {
                Id = source.Id,
                Name = source.Name,
                Code = source.Code,
                Students = new List<int>(),
                Subjects = new List<int>(),
                Teachers = new List<int>(),
                TotalCreditHours = source.TotalCreditHours
            };

            if (!(source.Students is null))
                foreach (var item in source.Students)
                {
                    course.Students.Add(item.Id);
                }

            if (!(source.Subjects is null))
                foreach (var item in source.Subjects)
                {
                    course.Subjects.Add(item.Id);
                }

            if (!(source.Teachers is null))
                foreach (var item in source.Teachers)
                {
                    course.Teachers.Add(item.Id);
                }

            return course;
        }
    }
}