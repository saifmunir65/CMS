using DataAccess.Models;
using System.Linq;
using BusinessLogic.DTOs;
using BusinessLogic.Interfaces;
using DataAccess.DatabseContexts;

namespace BusinessLogic.Implementations
{
    public class GradeMapper:IGradeMapper
    {
        private MagniDBContext database;
        private ICourseMapper courseMapper;
        public GradeMapper(MagniDBContext database, ICourseMapper courseMapper)
        {
            this.database = database;
            this.courseMapper = courseMapper;
        }

        public Grade Map(Grade grade, GradeDTO source)
        {
            if (source is null)
                return null;

            grade.Id = source.Id;
            grade.Title = source.Title;
            grade.StartingMarks = source.StartingMarks;
            grade.EndingMarks = source.EndingMarks;

            if (!(source.Course is null))
                grade.Course = database.Courses.FirstOrDefault(x => x.Id.Equals(source.Course.Id));

            return grade;
        }

        public GradeDTO Map(Grade source)
        {
            if (source is null)
                return null;

            var grade = new GradeDTO
            {
                Id = source.Id,
                Title = source.Title,
                StartingMarks = source.StartingMarks,
                EndingMarks=source.EndingMarks,
            };

            if (!(source.Course is null))
                grade.Course = courseMapper.Map(source.Course);

            return grade;
        }
    }
}