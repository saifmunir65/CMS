using DataAccess.Models;
using System.Linq;
using System.Collections.Generic;
using DataAccess.DatabseContexts;
using System;
using BusinessLogic.DTOs;
using BusinessLogic.Interfaces;

namespace BusinessLogic.Implementations
{
    public  class TeacherMapper:ITeacherMapper
    {
        private MagniDBContext database;
        public TeacherMapper(MagniDBContext database)
        {
            this.database = database;
        }
        public  Teacher Map(Teacher teacher, TeacherDTO source)
        {
            if (source is null)
                return null;

            teacher.Id = source.Id;
            teacher.Name = source.Name;
            teacher.Salary = source.Salary;
            teacher.Birthday = DateTime.Parse(source.Birthday??null);
            teacher.Subjects = new List<Subject>();
            teacher.Courses = new List<Course>();

            if (!(source.Subjects is null))
            {
                var dbSubjects = database.Subjects;
                teacher.Subjects.Clear();
                foreach (var item in source.Subjects)
                {
                    teacher.Subjects.Add(dbSubjects.FirstOrDefault
                        (
                            x => x.Id.Equals(item)
                        ));
                }
            }

            if (!(source.Courses is null))
            {
                var dbCourses = database.Courses;
                teacher.Courses.Clear();
                foreach (var item in source.Courses)
                {
                    teacher.Courses.Add(dbCourses.FirstOrDefault
                        (
                            x => x.Id.Equals(item)
                        ));
                }
            }

            return teacher;
        }

        public  TeacherDTO Map(Teacher source)
        {
            if (source is null)
                return null;

            var teacher = new TeacherDTO
            {
                Id = source.Id,
                Name = source.Name,
                Salary = source.Salary,
                Birthday = source.Birthday.Date.ToString("yyyy-MM-dd"),
                Students = new List<int>(),
                Subjects = new List<int>(),
                Courses = new List<int>(),
            };

            if (!(source.Subjects is null))
                foreach (var item in source.Subjects)
                {
                    teacher.Subjects.Add(item.Id);
                }

            if (!(source.Courses is null))
                foreach (var item in source.Courses)
                {
                    teacher.Courses.Add(item.Id);
                }

            return teacher;
        }
    }
}