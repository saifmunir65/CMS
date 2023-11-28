using System;
using System.Collections.Generic;
using MagniCollegeManagementSystem.APIController;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System.Threading;
using System.Web.Http.Results;
using MagniCollegeManagementSystem.Common;
using Newtonsoft.Json;
using BusinessLogic.Interfaces;
using FluentAssertions;
using BusinessLogic.DTOs;

namespace UnitTests.Controller
{
    /// <summary>
    /// Summary description for CourseControllerTests
    /// </summary>
    [TestClass]
    public class CourseControllerTests
    {
        private Mock<ICourseManager> mockCourseManager;
        private Mock<IMagniLogger> mockMagniLogger;
        private CoursesController controller;
        public CourseControllerTests()
        {
            mockCourseManager = new Mock<ICourseManager>();
            mockMagniLogger = new Mock<IMagniLogger>();
            controller = new CoursesController(mockMagniLogger.Object, mockCourseManager.Object);
            controller.Configuration = new System.Web.Http.HttpConfiguration();
            controller.Request = new System.Net.Http.HttpRequestMessage();
        }

        [TestCleanup]
        public void CleanUp()
        {
            mockCourseManager.Reset();
            mockMagniLogger.Reset();
        }
        #region GetCourses
        [TestMethod]
        public void GetCourses_ShouldReturn_CoursesList_If_DataExists()
        {
            //Arrange
            var Courses = new List<CourseDTO>()
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

            var source = new CancellationTokenSource();
            mockCourseManager.Setup(x => x.GetAll()).ReturnsAsync(Courses);
            //Act
            var httpActionResult = controller.GetCourses().Result;
            var content = httpActionResult.ExecuteAsync(source.Token).Result.Content;
            var json = content.ReadAsStringAsync().Result;
            var actualResponse = JsonConvert.DeserializeObject<List<CourseDTO>>(json);
            //Assert
            actualResponse.Should().BeEquivalentTo(Courses);
            Assert.IsInstanceOfType(httpActionResult, typeof(OkNegotiatedContentResult<List<CourseDTO>>));
        }

        [TestMethod]
        public void GetCourses_ShouldReturn_Status_OK__If_DataExists()
        {
            //Arrange
            var Courses = new List<CourseDTO>()
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
            mockCourseManager.Setup(x => x.GetAll()).ReturnsAsync(Courses);
            //Act
            var httpActionResult = controller.GetCourses().Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(OkNegotiatedContentResult<List<CourseDTO>>));
        }

        [TestMethod]
        public void GetCourses_ShouldReturn_EmptyCoursesList_If_No_DataExists()
        {
            //Arrange
            var Courses = new List<CourseDTO>();
            var source = new CancellationTokenSource();
            mockCourseManager.Setup(x => x.GetAll()).ReturnsAsync(Courses);
            //Act
            var httpActionResult = controller.GetCourses().Result;
            var content = httpActionResult.ExecuteAsync(source.Token).Result.Content;
            var json = content.ReadAsStringAsync().Result;
            var actualResponse = JsonConvert.DeserializeObject<List<CourseDTO>>(json);
            //Assert
            actualResponse.Should().BeEquivalentTo(Courses);
        }

        [TestMethod]
        public void GetCourses_ShouldReturn_Status_OK__If_No_DataExists()
        {
            //Arrange
            mockCourseManager.Setup(x => x.GetAll()).ReturnsAsync(new List<CourseDTO>());
            //Act
            var httpActionResult = controller.GetCourses().Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(OkNegotiatedContentResult<List<CourseDTO>>));
        }

        [TestMethod]
        public void GetCourses_ShouldReturn_Status_InternalServerError_If_ExceptionReceived()
        {
            //Arrange
            mockCourseManager.Setup(x => x.GetAll()).ThrowsAsync(new Exception(""));
            //Act
            var httpActionResult = controller.GetCourses().Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(InternalServerErrorResult));
        }
        #endregion
        #region GetCourse
        [TestMethod]
        public void GetCourse_ShouldReturn_Status_InternalServerError_If_ExceptionReceived()
        {
            //Arrange
            var source = new CancellationTokenSource();
            mockCourseManager.Setup(x => x.Get(It.IsAny<int>())).Throws(new Exception(""));
            //Act
            var httpActionResult = controller.GetCourse(It.IsAny<int>()).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(InternalServerErrorResult));
        }

        [TestMethod]
        public void GetCourse_ShouldReturn_NotFound_If_Course_NotFound()
        {
            //Arrange
            CourseDTO Course = null;
            mockCourseManager.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(Course);
            //Act
            var httpActionResult = controller.GetCourse(It.IsAny<int>()).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(NotFoundResult));
        }

        [TestMethod]
        public void GetCourse_ShouldReturn_Status_Ok_If_DataExists()
        {
            //Arrange
            var Course = new CourseDTO()
            {
                Id = 1,
                Name = "ABC_1",
            };
            mockCourseManager.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(Course);
            //Act
            var httpActionResult = controller.GetCourse(It.IsAny<int>()).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(OkNegotiatedContentResult<CourseDTO>));
        }

        [TestMethod]
        public void GetCourse_ShouldReturn_Course_If_DataExists()
        {
            //Arrange
            var Course = new CourseDTO()
            {
                Id = 1,
                Name = "ABC_1",
            };

            var source = new CancellationTokenSource();
            mockCourseManager.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(Course);
            //Act
            var httpActionResult = controller.GetCourse(It.IsAny<int>()).Result;
            var content = httpActionResult.ExecuteAsync(source.Token).Result.Content;
            var json = content.ReadAsStringAsync().Result;
            var actualResponse = JsonConvert.DeserializeObject<CourseDTO>(json);
            //Assert
            actualResponse.Should().BeEquivalentTo(Course);
        }

        #endregion
        #region PostCourse
        [TestMethod]
        public void PostCourse_ShouldReturn_Status_InternalServerError_If_ExceptionReceived()
        {
            //Arrange
            CourseDTO Course = new CourseDTO();
            mockCourseManager.Setup(x => x.Add(It.IsAny<CourseDTO>())).Throws(new Exception(""));
            //Act
            var httpActionResult = controller.PostCourse(Course).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(InternalServerErrorResult));
        }

        [TestMethod]
        public void PostCourse_ShouldReturn_Status_Created_If_DataAdded()
        {
            //Arrange
            CourseDTO request = new CourseDTO();

            mockCourseManager.Setup(x => x.Add(It.IsAny<CourseDTO>())).ReturnsAsync(It.IsAny<int>());
            //Act
            var httpActionResult = controller.PostCourse(request).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(CreatedAtRouteNegotiatedContentResult<CourseDTO>));
        }
        #endregion
        #region PutCourse
        [TestMethod]
        public void PutCourse_ShouldReturn_Status_InternalServerError_If_ExceptionReceived()
        {
            //Arrange
            CourseDTO Course = new CourseDTO();
            mockCourseManager.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(Course);
            mockCourseManager.Setup(x => x.Update(It.IsAny<CourseDTO>())).Throws(new Exception(""));
            //Act
            var httpActionResult = controller.PutCourse(Course.Id, Course).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(InternalServerErrorResult));
        }

        [TestMethod]
        public void PutCourse_ShouldReturn_Status_BadRequest_If_CourseId_NotMatched()
        {
            //Arrange
            var Course = new CourseDTO()
            {
                Id = 1
            };
            int invalidId = 2;
            //Act
            var httpActionResult = controller.PutCourse(invalidId, Course).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(BadRequestResult));
        }

        [TestMethod]
        public void PutCourse_ShouldReturn_Status_BadRequest_If_InvalidDataProvided()
        {
            //Arrange
            CourseDTO Course = new CourseDTO();
            CourseDTO response = null;

            mockCourseManager.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(response);
            mockCourseManager.Setup(x => x.Update(It.IsAny<CourseDTO>())).ReturnsAsync(It.IsAny<int>());
            //Act
            var httpActionResult = controller.PutCourse(Course.Id, Course).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(BadRequestResult));
        }

        [TestMethod]
        public void PutCourse_ShouldReturn_Status_NoContent_If_DataUpdated()
        {
            //Arrange
            var Course = new CourseDTO()
            {
                Id = 1,
                Name = "ABC_1",
            };
            mockCourseManager.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(Course);
            mockCourseManager.Setup(x => x.Update(It.IsAny<CourseDTO>())).ReturnsAsync(It.IsAny<int>());
            //Act
            var httpActionResult = controller.PutCourse(Course.Id, Course).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(StatusCodeResult));
        }
        #endregion
        #region DeleteCourse
        [TestMethod]
        public void DeleteCourse_ShouldReturn_Status_Ok_If_DataDeleted()
        {
            //Arrange
            var Course = new CourseDTO()
            {
                Id = 1,
                Name = "ABC_1",
            };

            mockCourseManager.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(Course);
            mockCourseManager.Setup(x => x.Delete(It.IsAny<int>())).ReturnsAsync(It.IsAny<int>());
            //Act
            var httpActionResult = controller.DeleteCourse(It.IsAny<int>()).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(OkResult));
        }

        [TestMethod]
        public void DeleteCourse_ShouldReturn_Status_NotFound_If_CourseId_NotMatched()
        {
            //Arrange
            CourseDTO response = null;
            mockCourseManager.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(response);
            //Act
            var httpActionResult = controller.DeleteCourse(It.IsAny<int>()).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(NotFoundResult));
        }

        [TestMethod]
        public void DeleteCourse_ShouldReturn_Status_InternalServerError_If_ExceptionReceived()
        {
            //Arrange
            var source = new CancellationTokenSource();
            mockCourseManager.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(new CourseDTO());
            mockCourseManager.Setup(x => x.Delete(It.IsAny<int>())).ThrowsAsync(new Exception(""));
            //Act
            var httpActionResult = controller.DeleteCourse(It.IsAny<int>()).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(InternalServerErrorResult));
        }

        #endregion
    }
}
