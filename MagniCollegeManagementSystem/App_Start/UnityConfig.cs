using System.Web.Http;
using DataAccess.Repositories.Interfaces;
using Unity;
using DataAccess.DatabseContexts;
using BusinessLogic.Implementations;
using BusinessLogic.Interfaces;
using DataAccess.Models;
using DataAccess.Repositories.Implementations;
using MagniCollegeManagementSystem.App_Start;
using MagniCollegeManagementSystem.Common;
using MagniCollegeManagementSystem.Hubs;
using Microsoft.AspNet.SignalR;

namespace MagniCollegeManagementSystem
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
			var container = new UnityContainer();
            GlobalConfiguration.Configuration.DependencyResolver = new Unity.WebApi.UnityDependencyResolver(container);
            container.RegisterType<MagniDBContext, MagniDBContext>(new PerRequestLifetimeManagerCustom());
            container.RegisterType<IMagniLogger, MagniLogger>();

            container.RegisterType<IRepository<Result>, ResultRepository>();
            container.RegisterType<IRepository<Course>, CourseRepository>();
            container.RegisterType<IRepository<Teacher>, TeacherRepository>();
            container.RegisterType<IRepository<Subject>, SubjectRepository>();
            container.RegisterType<IRepository<Student>, StudentRepository>();
            container.RegisterType<IRepository<Grade>, GradeRepository>();

            container.RegisterType<ICourseMapper, CourseMapper>();
            container.RegisterType<IGradeMapper, GradeMapper>();
            container.RegisterType<ITeacherMapper, TeacherMapper>();
            container.RegisterType<ISubjectMapper, SubjectMapper>();
            container.RegisterType<IStudentMapper, StudentMapper>();
            container.RegisterType<IResultMapper, ResultMapper>();

            container.RegisterType<ICourseDAL, CourseDAL>();
            container.RegisterType<ISubjectDAL, SubjectDAL>();
            container.RegisterType<ITeacherDAL, TeacherDAL>();
            container.RegisterType<IGradeDAL, GradeDAL>();
            container.RegisterType<IResultDAL, ResultDAL>();
            container.RegisterType<IStudentDAL, StudentDAL>();

            container.RegisterType<IStudentManager, StudentManager>();
            container.RegisterType<ITeacherManager, TeacherManager>();
            container.RegisterType<ISubjectManager, SubjectManager>();
            container.RegisterType<ICourseManager, CourseManager>();
            container.RegisterType<IGradeManager, GradeManager>();
            container.RegisterType<IResultManager, ResultManager>();
        }
    }
}