using System;
using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using BusinessLogic.Interfaces;
using FluentAssertions;
using BusinessLogic.DTOs;
using BusinessLogic.Implementations;
using DataAccess.DatabseContexts;
using DataAccess.Models;
using DataAccess.Repositories.Interfaces;

namespace UnitTests.Controller
{
    /// <summary>
    /// Summary description for CourseControllerTests
    /// </summary>
    [TestClass]
    public class CourseManagerTests
    {
        private readonly Mock<ICourseDAL> mockCourseDAL;
        private readonly Mock<ICourseMapper> mockCourseMapper;
        private readonly Mock<ICourseRepository> mockCourseRepository;
        private readonly Mock<MagniDBContext> mockMagniDB;
        private ICourseManager manager;
        public CourseManagerTests()
        {
            mockMagniDB = new Mock<MagniDBContext>();
            mockCourseMapper = new Mock<ICourseMapper>();
            mockCourseRepository = new Mock<ICourseRepository>();
            mockCourseDAL = new Mock<ICourseDAL>();
            manager = new CourseManager(mockCourseDAL.Object, mockCourseMapper.Object);
        }

        [TestCleanup]
        public void CleanUp()
        {
            mockCourseMapper.Reset();
            mockMagniDB.Reset();
            mockCourseRepository.Reset();
            mockCourseDAL.Reset();
        }
        #region GetAll
        [TestMethod]
        public void GetAll_ShouldReturn_CoursesList_If_DataExists()
        {
            //Arrange
            var Courses = new List<Course>()
            {
                new Course()
                {
                    Id = 1,
                    Name = "ABC_1",
                },
                new Course()
                {
                    Id = 2,
                    Name = "ABC_2",
                },
                new Course()
                {
                    Id = 3,
                    Name = "ABC_3",
                }
            };

            var CoursesDTOs = new List<CourseDTO>()
            {
                new CourseDTO()
                {
                    Id = 1,
                    Name = "ABC_1",
                },
                new CourseDTO()
                {
                    Id = 2,
                    Name = "ABC_2",
                },
                new CourseDTO()
                {
                    Id = 3,
                    Name = "ABC_3",
                }
            };

            mockCourseMapper.Setup(x => x.Map(Courses[0])).Returns(CoursesDTOs[0]);
            mockCourseMapper.Setup(x => x.Map(Courses[1])).Returns(CoursesDTOs[1]);
            mockCourseMapper.Setup(x => x.Map(Courses[2])).Returns(CoursesDTOs[2]);
            mockCourseDAL.Setup(x => x.GetAll()).ReturnsAsync(Courses);
            //Act
            var response = manager.GetAll().Result;
            //Assert
            response.Should().BeEquivalentTo(CoursesDTOs);
        }

        [TestMethod]
        [ExpectedException(typeof(AggregateException))]
        public void GetAll_ShouldReturn_Exception_If_ExceptionReceived()
        {
            //Arrange
            mockCourseDAL.Setup(x => x.GetAll()).Throws(new Exception(""));
            //Act
            var response = manager.GetAll().Result;
        }
        #endregion
        #region Get
        [TestMethod]
        public void Get_ShouldReturn_CoursesList_If_DataExists()
        {
            //Arrange
            var Course = new Course()
            {
                Id = 1,
                Name = "ABC_1",
            };

            var CoursesDTO = new CourseDTO
            {
                Id = 3,
                Name = "ABC_3",
            };

            mockCourseMapper.Setup(x => x.Map(Course)).Returns(CoursesDTO);
            mockCourseDAL.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(Course);
            //Act
            var response = manager.Get(It.IsAny<int>()).Result;
            //Assert
            response.Should().BeEquivalentTo(CoursesDTO);
        }

        [TestMethod]
        [ExpectedException(typeof(AggregateException))]
        public void Get_ShouldReturn_Exception_If_ExceptionReceived()
        {
            //Arrange
            mockCourseDAL.Setup(x => x.Get(It.IsAny<int>())).Throws(new Exception(""));
            //Act
            var response = manager.Get(It.IsAny<int>()).Result;
        }
        #endregion
        #region Add
        [TestMethod]
        public void Add_ShouldReturn_RowCount_If_DataAdded()
        {
            //Arrange
            var Course = new Course()
            {
                Id = 1,
                Name = "ABC_1",
            };

            var CoursesDTO = new CourseDTO
            {
                Id = 3,
                Name = "ABC_3",
            };

            var numberOfRows = 1;
            mockCourseMapper.Setup(x => x.Map(Course, CoursesDTO)).Returns(Course);
            mockCourseDAL.Setup(x => x.Add(It.IsAny<Course>())).ReturnsAsync(numberOfRows);
            //Act
            var response = manager.Add(CoursesDTO).Result;
            //Assert
            response.Should().Be(numberOfRows);
        }

        [TestMethod]
        [ExpectedException(typeof(AggregateException))]
        public void Add_ShouldReturn_Exception_If_ExceptionReceived()
        {
            //Arrange
            mockCourseDAL.Setup(x => x.Add(It.IsAny<Course>())).Throws(new Exception(""));
            //Act
            var response = manager.Add(new CourseDTO()).Result;
        }
        #endregion
        #region Update
        [TestMethod]
        public void Update_ShouldReturn_RowCount_If_DataAdded()
        {
            //Arrange
            var Course = new Course()
            {
                Id = 1,
                Name = "ABC_1",
            };

            var CoursesDTO = new CourseDTO
            {
                Id = 3,
                Name = "ABC_3",
            };

            var numberOfRows = 1;
            mockCourseMapper.Setup(x => x.Map(Course, CoursesDTO)).Returns(Course);
            mockCourseDAL.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(Course);
            mockCourseDAL.Setup(x => x.Update(It.IsAny<Course>())).ReturnsAsync(numberOfRows);
            //Act
            var response = manager.Update(CoursesDTO).Result;
            //Assert
            response.Should().Be(numberOfRows);
        }

        [TestMethod]
        [ExpectedException(typeof(AggregateException))]
        public void Update_ShouldReturn_Exception_If_ExceptionReceived()
        {
            //Arrange
            mockCourseDAL.Setup(x => x.Update(It.IsAny<Course>())).Throws(new Exception(""));
            //Act
            var response = manager.Update(new CourseDTO()).Result;
        }
        #endregion
        #region Delete
        [TestMethod]
        public void Delete_ShouldReturn_RowCount_If_DataAdded()
        {
            //Arrange
            var Course = new Course()
            {
                Id = 1,
                Name = "ABC_1",
            };
            var numberOfRows = 1;
            mockCourseDAL.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(Course);
            mockCourseDAL.Setup(x => x.Delete(It.IsAny<Course>())).ReturnsAsync(numberOfRows);
            //Act
            var response = manager.Delete(It.IsAny<int>()).Result;
            //Assert
            response.Should().Be(numberOfRows);
        }

        [TestMethod]
        [ExpectedException(typeof(AggregateException))]
        public void Delete_ShouldReturn_Exception_If_ExceptionReceived()
        {
            //Arrange
            mockCourseDAL.Setup(x => x.Delete(It.IsAny<Course>())).Throws(new Exception(""));
            //Act
            var response = manager.Delete(It.IsAny<int>()).Result;
        }
        #endregion
    }

}
