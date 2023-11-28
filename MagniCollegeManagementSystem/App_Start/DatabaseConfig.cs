using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.IO;
using System.Linq;
using DataAccess.DatabseContexts;
using DataAccess.Models;
using MagniCollegeManagementSystem.Common;

namespace MagniCollegeManagementSystem.App_Start
{
    public static class DatabaseConfig
    {
        /// <summary>
        /// Initialize the DB with seed data for the first run
        /// </summary>
        public static void Initialize()
        {
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<MagniDBContext, Configuration>());
            MagniDBContext.Create().Database.Initialize(false);
        }
    }

    public sealed class Configuration : DbMigrationsConfiguration<MagniDBContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            AutomaticMigrationDataLossAllowed = true;
        }
        bool IsSeedNeeded()
        {
            var value = ConfigurationManager.AppSettings[Constants.SeedCheckKey];
            bool result;
            bool.TryParse(value, out result);
            return result;
        }
        /// <summary>
        /// Changes the status of the seed key in config.
        /// This will be replaced with some library method later on.
        /// Had to do this way because some limitation was not letting the key save in config.
        /// Using the Standard ways. 
        /// </summary>
        /// <param name="key"></param>
        /// <param name="value"></param>
        private void ChangeSeedConfigKey(string key, string value)
        {
            var lines = File.ReadAllLines(AppDomain.CurrentDomain.SetupInformation.ConfigurationFile);
            for (int count = 0; count < lines.Length; count++)
            {
                if (lines[count].Contains(key))
                {
                    if (string.Equals(value, "false", StringComparison.OrdinalIgnoreCase))
                    {
                        lines[count] = lines[count].Replace("True", "False");
                        break;
                    }
                    lines[count] = lines[count].Replace("False", "True");
                    break;
                }
            }
            File.WriteAllLines(AppDomain.CurrentDomain.SetupInformation.ConfigurationFile, lines);
        }
        /// <summary>
        /// Seeds the data at the start of the application
        /// </summary>
        /// <param name="context"></param>
        protected override void Seed(MagniDBContext context)
        {
            string apth = Environment.CurrentDirectory;
            if (IsSeedNeeded())
            {
                var courses = new[]
                {
                    new Course() {Id = 1, Name = "Bachelors Of Computer Science", Code = "BSCS", TotalCreditHours = 15},
                    new Course() {Id = 2, Name = "Bachelors Of Chemistry", Code = "BSCH", TotalCreditHours = 15}
                };

                var subjects = new[]
                {
                    new Subject() {Id = 1, Name = "Programming Fundamentals", Code = "PF-"+courses[0].Code, CreditHours = 3, Course =courses[0] },
                    new Subject() {Id = 2, Name = "Discrete Mathematics", Code = "DM-"+courses[0].Code, CreditHours = 3, Course =courses[0] },
                    new Subject() {Id = 3, Name = "Introduction To Computers", Code = "ITC-"+courses[0].Code, CreditHours = 3, Course =courses[0] },
                    new Subject() {Id = 4, Name = "Digital Logic Design", Code = "DLD-"+courses[0].Code, CreditHours = 3, Course =courses[0] },
                    new Subject() {Id = 5, Name = "Introduction To Maths", Code = "ITM-"+courses[0].Code, CreditHours = 3, Course =courses[0] },
                    new Subject() {Id = 6, Name = "Calculus", Code = "CAL-"+courses[0].Code, CreditHours = 3, Course =courses[0] },
                    new Subject() {Id = 7, Name = "Algebra", Code = "ALG-"+courses[0].Code, CreditHours = 3, Course =courses[0] },
                    new Subject() {Id = 8, Name = "Trigonometry", Code = "TRG-"+courses[0].Code, CreditHours = 3, Course =courses[0] },
                    new Subject() {Id = 9, Name = "Object Oriented Programming", Code = "OOP-"+courses[0].Code, CreditHours = 3, Course =courses[0] },
                    new Subject() {Id = 10, Name = "Operating Systems", Code = "OS-"+courses[0].Code, CreditHours = 3, Course =courses[0] },
                    new Subject() {Id = 11, Name = "Theory Of Auto-Meta", Code = "TOA-"+courses[0].Code, CreditHours = 3, Course =courses[0] },
                    new Subject() {Id = 12, Name = "Machine Learning", Code = "ML-"+courses[0].Code, CreditHours = 3, Course =courses[0] },
                    new Subject() {Id = 13, Name = "Enterprise Application Development", Code = "EAD-"+courses[0].Code, CreditHours = 3, Course =courses[0] },
                    new Subject() {Id = 14, Name = "Business Communication", Code = "BC-"+courses[0].Code, CreditHours = 3, Course =courses[0] },
                    new Subject() {Id = 15, Name = "Introduction To Networks", Code = "ITN-"+courses[0].Code, CreditHours = 3, Course =courses[0] },

                    new Subject() {Id = 16, Name = "Introduction To Organic Chemistry", Code = "ITOC-"+courses[1].Code, CreditHours = 3, Course =courses[1] },
                    new Subject() {Id = 17, Name = "Introduction To Bio Chemistry", Code = "ITBC-"+courses[1].Code, CreditHours = 3, Course =courses[1] },
                    new Subject() {Id = 18, Name = "Inorganic Chemistry", Code = "IOC-"+courses[1].Code, CreditHours = 3, Course =courses[1] },
                    new Subject() {Id = 19, Name = "Molecular  Chemistry", Code = "MC-"+courses[1].Code, CreditHours = 3, Course =courses[1] },
                    new Subject() {Id = 20, Name = "Industrial  Chemistry", Code = "IC-"+courses[1].Code, CreditHours = 3, Course =courses[1] },
                    new Subject() {Id = 21, Name = "Environmental  Chemistry", Code = "EC-"+courses[1].Code, CreditHours = 3, Course =courses[1] },
                };

                var teachers = new[]
                {
                    new Teacher(){Id =1, Name = "Mr X", Salary = 3000, Subjects =new List<Subject>() {subjects[0],subjects[1]}
                        ,Courses = new List<Course>(){courses[0]},Birthday = new DateTime(1975,2,17) },
                    new Teacher(){Id =2, Name = "Mr YY", Salary = 3500, Subjects =new List<Subject>() {subjects[2],subjects[3]}
                    ,Courses = new List<Course>(){courses[0]},Birthday = new DateTime(1985,2,25)},
                    new Teacher(){Id =2, Name = "Mr ZZZ", Salary = 3000, Subjects =new List<Subject>() {subjects[4],subjects[2]}
                        ,Courses = new List<Course>(){courses[0]},Birthday = new DateTime(1980,3,5)}
                };

                var grades = new[]
                {
                    new Grade {Id = 1, Title = "A", StartingMarks = 86, EndingMarks = 100, Course = courses[0]},
                    new Grade {Id = 2, Title = "A-", StartingMarks = 81, EndingMarks = 85, Course = courses[0]},
                    new Grade {Id = 3, Title = "B", StartingMarks = 76, EndingMarks = 80, Course = courses[0]},
                    new Grade {Id = 4, Title = "B-", StartingMarks = 71, EndingMarks = 75, Course = courses[0]},
                    new Grade {Id = 5, Title = "C", StartingMarks = 66, EndingMarks = 70, Course = courses[0]},
                    new Grade {Id = 6, Title = "C-", StartingMarks = 61, EndingMarks = 65, Course = courses[0]},
                    new Grade {Id = 7, Title = "D", StartingMarks = 56, EndingMarks = 60, Course = courses[0]},
                    new Grade {Id = 8, Title = "D-", StartingMarks = 50, EndingMarks = 55, Course = courses[0]},
                    new Grade {Id = 9, Title = "F", StartingMarks = 1, EndingMarks = 49, Course = courses[0]},

                    new Grade {Id = 10, Title = "A", StartingMarks = 86, EndingMarks = 100, Course = courses[1]},
                    new Grade {Id = 11, Title = "A-", StartingMarks = 81, EndingMarks = 85, Course = courses[1]},
                    new Grade {Id = 12, Title = "B", StartingMarks = 76, EndingMarks = 80, Course = courses[1]},
                    new Grade {Id = 13, Title = "B-", StartingMarks = 71, EndingMarks = 75, Course = courses[1]},
                    new Grade {Id = 14, Title = "C", StartingMarks = 66, EndingMarks = 70, Course = courses[1]},
                    new Grade {Id = 15, Title = "C-", StartingMarks = 61, EndingMarks = 65, Course = courses[1]},
                    new Grade {Id = 16, Title = "D", StartingMarks = 56, EndingMarks = 60, Course = courses[1]},
                    new Grade {Id = 17, Title = "D-", StartingMarks = 50, EndingMarks = 55, Course = courses[1]},
                    new Grade {Id = 18, Title = "F", StartingMarks = 1, EndingMarks = 49, Course = courses[1]}
                };

                var students = new Student[]
                {
                    new Student {Id = 1, Name = "John Smith", RegisterationNumber = courses[0].Code+"-1", Course = courses[0],
                        Subjects =new List<Subject>() {subjects[0],subjects[1]}, Birthday = new DateTime(2004,1,12)},
                    new Student {Id = 2, Name = "Green J", RegisterationNumber = courses[0].Code+"-2", Course = courses[0],
                        Subjects =new List<Subject>() {subjects[0],subjects[1]}, Birthday = new DateTime(2006,9,25)},
                    new Student {Id = 3, Name = "Walton", RegisterationNumber = courses[0].Code+"-3", Course = courses[0],
                        Subjects =new List<Subject>() {subjects[3],subjects[4],subjects[6]}, Birthday = new DateTime(2005,3,5)},
                    new Student {Id = 4, Name = "Nick", RegisterationNumber = courses[0].Code+"-4", Course = courses[0],
                        Subjects =new List<Subject>() {subjects[3],subjects[0],subjects[8]}, Birthday = new DateTime(2005,9,21)},
                };

                var results = new []
                {
                    new Result {Id = 1, Course = courses[0], Subject = subjects[0],Student = students[0],ObtainedMarks = 75, Grade = grades[3]},
                    new Result {Id = 2, Course = courses[0], Subject = subjects[1],Student = students[1],ObtainedMarks = 85, Grade = grades[1]},
                    new Result {Id = 3, Course = courses[0], Subject = subjects[0],Student = students[1],ObtainedMarks = 90, Grade = grades[0]},
                };

                students[0].Results = results.Where(x => x.Student == students[0]).ToList();
                students[1].Results = results.Where(x => x.Student == students[1]).ToList();

                subjects[0].Students = students.Where(x => x.Subjects.Contains(subjects[0])).ToList();
                subjects[3].Students = students.Where(x => x.Subjects.Contains(subjects[3])).ToList();
                subjects[4].Students = students.Where(x => x.Subjects.Contains(subjects[4])).ToList();
                subjects[6].Students = students.Where(x => x.Subjects.Contains(subjects[6])).ToList();
                subjects[8].Students = students.Where(x => x.Subjects.Contains(subjects[8])).ToList();

                courses[0].Students = students.Where(x => x.Course == courses[0]).ToList();
                courses[0].Subjects = subjects.Where(x => x.Course == courses[0]).ToList();
                

                context.Grades.AddRange(grades);
                context.Courses.AddRange(courses);
                context.Subjects.AddRange(subjects);
                context.Teachers.AddRange(teachers);
                context.Students.AddRange(students);
                context.Results.AddRange(results);

                base.Seed(context);
                ChangeSeedConfigKey(Constants.SeedCheckKey, "False");
            }
        }
    }
}