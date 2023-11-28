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
    /// Summary description for TeacherControllerTests
    /// </summary>
    [TestClass]
    public class TeacherControllerTests
    {
        private Mock<ITeacherManager> mockTeacherManager;
        private Mock<IMagniLogger> mockMagniLogger;
        private TeachersController controller;
        public TeacherControllerTests()
        {
            mockTeacherManager = new Mock<ITeacherManager>();
            mockMagniLogger = new Mock<IMagniLogger>();
            controller = new TeachersController(mockMagniLogger.Object, mockTeacherManager.Object);
            controller.Configuration = new System.Web.Http.HttpConfiguration();
            controller.Request = new System.Net.Http.HttpRequestMessage();
        }

        [TestCleanup]
        public void CleanUp()
        {
            mockTeacherManager.Reset();
            mockMagniLogger.Reset();
        }
        #region GetTeachers
        [TestMethod]
        public void GetTeachers_ShouldReturn_TeachersList_If_DataExists()
        {
            //Arrange
            var Teachers = new List<TeacherDTO>()
            {
                new TeacherDTO()
                {
                    Id = 1,
                    Name = "ABC_1",
                },
                new TeacherDTO()
                {
                    Id = 2,
                    Name = "ABC_2",
                },
                new TeacherDTO()
                {
                    Id = 3,
                    Name = "ABC_3",
                }
            };

            var source = new CancellationTokenSource();
            mockTeacherManager.Setup(x => x.GetAll()).ReturnsAsync(Teachers);
            //Act
            var httpActionResult = controller.GetTeachers().Result;
            var content = httpActionResult.ExecuteAsync(source.Token).Result.Content;
            var json = content.ReadAsStringAsync().Result;
            var actualResponse = JsonConvert.DeserializeObject<List<TeacherDTO>>(json);
            //Assert
            actualResponse.Should().BeEquivalentTo(Teachers);
            Assert.IsInstanceOfType(httpActionResult, typeof(OkNegotiatedContentResult<List<TeacherDTO>>));
        }

        [TestMethod]
        public void GetTeachers_ShouldReturn_Status_OK__If_DataExists()
        {
            //Arrange
            var Teachers = new List<TeacherDTO>()
            {
                new TeacherDTO()
                {
                    Id = 1,
                    Name = "ABC_1",
                },
                new TeacherDTO()
                {
                    Id = 2,
                    Name = "ABC_2",
                },
                new TeacherDTO()
                {
                    Id = 3,
                    Name = "ABC_3",
                }
            };
            mockTeacherManager.Setup(x => x.GetAll()).ReturnsAsync(Teachers);
            //Act
            var httpActionResult = controller.GetTeachers().Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(OkNegotiatedContentResult<List<TeacherDTO>>));
        }

        [TestMethod]
        public void GetTeachers_ShouldReturn_EmptyTeachersList_If_No_DataExists()
        {
            //Arrange
            var Teachers = new List<TeacherDTO>();
            var source = new CancellationTokenSource();
            mockTeacherManager.Setup(x => x.GetAll()).ReturnsAsync(Teachers);
            //Act
            var httpActionResult = controller.GetTeachers().Result;
            var content = httpActionResult.ExecuteAsync(source.Token).Result.Content;
            var json = content.ReadAsStringAsync().Result;
            var actualResponse = JsonConvert.DeserializeObject<List<TeacherDTO>>(json);
            //Assert
            actualResponse.Should().BeEquivalentTo(Teachers);
        }

        [TestMethod]
        public void GetTeachers_ShouldReturn_Status_OK__If_No_DataExists()
        {
            //Arrange
            mockTeacherManager.Setup(x => x.GetAll()).ReturnsAsync(new List<TeacherDTO>());
            //Act
            var httpActionResult = controller.GetTeachers().Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(OkNegotiatedContentResult<List<TeacherDTO>>));
        }

        [TestMethod]
        public void GetTeachers_ShouldReturn_Status_InternalServerError_If_ExceptionReceived()
        {
            //Arrange
            mockTeacherManager.Setup(x => x.GetAll()).ThrowsAsync(new Exception(""));
            //Act
            var httpActionResult = controller.GetTeachers().Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(InternalServerErrorResult));
        }
        #endregion
        #region GetTeacher
        [TestMethod]
        public void GetTeacher_ShouldReturn_Status_InternalServerError_If_ExceptionReceived()
        {
            //Arrange
            var source = new CancellationTokenSource();
            mockTeacherManager.Setup(x => x.Get(It.IsAny<int>())).Throws(new Exception(""));
            //Act
            var httpActionResult = controller.GetTeacher(It.IsAny<int>()).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(InternalServerErrorResult));
        }

        [TestMethod]
        public void GetTeacher_ShouldReturn_NotFound_If_Teacher_NotFound()
        {
            //Arrange
            TeacherDTO Teacher = null;
            mockTeacherManager.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(Teacher);
            //Act
            var httpActionResult = controller.GetTeacher(It.IsAny<int>()).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(NotFoundResult));
        }

        [TestMethod]
        public void GetTeacher_ShouldReturn_Status_Ok_If_DataExists()
        {
            //Arrange
            var Teacher = new TeacherDTO()
            {
                Id = 1,
                Name = "ABC_1",
            };
            mockTeacherManager.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(Teacher);
            //Act
            var httpActionResult = controller.GetTeacher(It.IsAny<int>()).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(OkNegotiatedContentResult<TeacherDTO>));
        }

        [TestMethod]
        public void GetTeacher_ShouldReturn_Teacher_If_DataExists()
        {
            //Arrange
            var Teacher = new TeacherDTO()
            {
                Id = 1,
                Name = "ABC_1",
            };

            var source = new CancellationTokenSource();
            mockTeacherManager.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(Teacher);
            //Act
            var httpActionResult = controller.GetTeacher(It.IsAny<int>()).Result;
            var content = httpActionResult.ExecuteAsync(source.Token).Result.Content;
            var json = content.ReadAsStringAsync().Result;
            var actualResponse = JsonConvert.DeserializeObject<TeacherDTO>(json);
            //Assert
            actualResponse.Should().BeEquivalentTo(Teacher);
        }

        #endregion
        #region PostTeacher
        [TestMethod]
        public void PostTeacher_ShouldReturn_Status_InternalServerError_If_ExceptionReceived()
        {
            //Arrange
            TeacherDTO Teacher = new TeacherDTO();
            mockTeacherManager.Setup(x => x.Add(It.IsAny<TeacherDTO>())).Throws(new Exception(""));
            //Act
            var httpActionResult = controller.PostTeacher(Teacher).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(InternalServerErrorResult));
        }

        [TestMethod]
        public void PostTeacher_ShouldReturn_Status_Created_If_DataAdded()
        {
            //Arrange
            TeacherDTO request = new TeacherDTO();

            mockTeacherManager.Setup(x => x.Add(It.IsAny<TeacherDTO>())).ReturnsAsync(It.IsAny<int>());
            //Act
            var httpActionResult = controller.PostTeacher(request).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(CreatedAtRouteNegotiatedContentResult<TeacherDTO>));
        }
        #endregion
        #region PutTeacher
        [TestMethod]
        public void PutTeacher_ShouldReturn_Status_InternalServerError_If_ExceptionReceived()
        {
            //Arrange
            TeacherDTO Teacher = new TeacherDTO();
            mockTeacherManager.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(Teacher);
            mockTeacherManager.Setup(x => x.Update(It.IsAny<TeacherDTO>())).Throws(new Exception(""));
            //Act
            var httpActionResult = controller.PutTeacher(Teacher.Id, Teacher).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(InternalServerErrorResult));
        }

        [TestMethod]
        public void PutTeacher_ShouldReturn_Status_BadRequest_If_TeacherId_NotMatched()
        {
            //Arrange
            var Teacher = new TeacherDTO()
            {
                Id = 1
            };
            int invalidId = 2;
            //Act
            var httpActionResult = controller.PutTeacher(invalidId, Teacher).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(BadRequestResult));
        }

        [TestMethod]
        public void PutTeacher_ShouldReturn_Status_BadRequest_If_InvalidDataProvided()
        {
            //Arrange
            TeacherDTO Teacher = new TeacherDTO();
            TeacherDTO response = null;

            mockTeacherManager.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(response);
            mockTeacherManager.Setup(x => x.Update(It.IsAny<TeacherDTO>())).ReturnsAsync(It.IsAny<int>());
            //Act
            var httpActionResult = controller.PutTeacher(Teacher.Id, Teacher).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(BadRequestResult));
        }

        [TestMethod]
        public void PutTeacher_ShouldReturn_Status_NoContent_If_DataUpdated()
        {
            //Arrange
            var Teacher = new TeacherDTO()
            {
                Id = 1,
                Name = "ABC_1",
            };
            mockTeacherManager.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(Teacher);
            mockTeacherManager.Setup(x => x.Update(It.IsAny<TeacherDTO>())).ReturnsAsync(It.IsAny<int>());
            //Act
            var httpActionResult = controller.PutTeacher(Teacher.Id, Teacher).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(StatusCodeResult));
        }
        #endregion
        #region DeleteTeacher
        [TestMethod]
        public void DeleteTeacher_ShouldReturn_Status_Ok_If_DataDeleted()
        {
            //Arrange
            var Teacher = new TeacherDTO()
            {
                Id = 1,
                Name = "ABC_1",
            };

            mockTeacherManager.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(Teacher);
            mockTeacherManager.Setup(x => x.Delete(It.IsAny<int>())).ReturnsAsync(It.IsAny<int>());
            //Act
            var httpActionResult = controller.DeleteTeacher(It.IsAny<int>()).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(OkResult));
        }

        [TestMethod]
        public void DeleteTeacher_ShouldReturn_Status_NotFound_If_TeacherId_NotMatched()
        {
            //Arrange
            TeacherDTO response = null;
            mockTeacherManager.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(response);
            //Act
            var httpActionResult = controller.DeleteTeacher(It.IsAny<int>()).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(NotFoundResult));
        }

        [TestMethod]
        public void DeleteTeacher_ShouldReturn_Status_InternalServerError_If_ExceptionReceived()
        {
            //Arrange
            var source = new CancellationTokenSource();
            mockTeacherManager.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(new TeacherDTO());
            mockTeacherManager.Setup(x => x.Delete(It.IsAny<int>())).ThrowsAsync(new Exception(""));
            //Act
            var httpActionResult = controller.DeleteTeacher(It.IsAny<int>()).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(InternalServerErrorResult));
        }

        #endregion
    }
}
