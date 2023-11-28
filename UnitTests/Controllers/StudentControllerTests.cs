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
    /// Summary description for StudentControllerTests
    /// </summary>
    [TestClass]
    public class StudentControllerTests
    {
        private Mock<IStudentManager> mockStudentManager;
        private Mock<IMagniLogger> mockMagniLogger;
        private StudentsController controller;
        public StudentControllerTests()
        {
            mockStudentManager = new Mock<IStudentManager>();
            mockMagniLogger = new Mock<IMagniLogger>();
            controller = new StudentsController(mockMagniLogger.Object, mockStudentManager.Object);
            controller.Configuration = new System.Web.Http.HttpConfiguration();
            controller.Request = new System.Net.Http.HttpRequestMessage();
        }

        [TestCleanup]
        public void CleanUp()
        {
            mockStudentManager.Reset();
            mockMagniLogger.Reset();
        }
        #region GetStudents
        [TestMethod]
        public void GetStudents_ShouldReturn_StudentsList_If_DataExists()
        {
            //Arrange
            var students = new List<StudentDTO>()
            {
                new StudentDTO()
                {
                    Id = 1,
                    Name = "ABC_1",
                    Birthday = new DateTime(1992,2,12).ToString()
                },
                new StudentDTO()
                {
                    Id = 2,
                    Name = "ABC_2",
                    Birthday = new DateTime(1995,2,12).ToString()
                },
                new StudentDTO()
                {
                    Id = 3,
                    Name = "ABC_3",
                    Birthday = new DateTime(1996,2,12).ToString()
                }
            };

            var source = new CancellationTokenSource();
            mockStudentManager.Setup(x => x.GetAll()).ReturnsAsync(students);
            //Act
            var httpActionResult = controller.GetStudents().Result;
            var content = httpActionResult.ExecuteAsync(source.Token).Result.Content;
            var json = content.ReadAsStringAsync().Result;
            var actualResponse = JsonConvert.DeserializeObject<List<StudentDTO>>(json);
            //Assert
            actualResponse.Should().BeEquivalentTo(students);
            Assert.IsInstanceOfType(httpActionResult, typeof(OkNegotiatedContentResult<List<StudentDTO>>));
        }

        [TestMethod]
        public void GetStudents_ShouldReturn_Status_OK__If_DataExists()
        {
            //Arrange
            var students = new List<StudentDTO>()
            {
                new StudentDTO()
                {
                    Id = 1,
                    Name = "ABC_1",
                    Birthday = new DateTime(1992,2,12).ToString()
                },
                new StudentDTO()
                {
                    Id = 2,
                    Name = "ABC_2",
                    Birthday = new DateTime(1995,2,12).ToString()
                },
                new StudentDTO()
                {
                    Id = 3,
                    Name = "ABC_3",
                    Birthday = new DateTime(1996,2,12).ToString()
                }
            };
            mockStudentManager.Setup(x => x.GetAll()).ReturnsAsync(students);
            //Act
            var httpActionResult = controller.GetStudents().Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(OkNegotiatedContentResult<List<StudentDTO>>));
        }

        [TestMethod]
        public void GetStudents_ShouldReturn_EmptyStudentsList_If_No_DataExists()
        {
            //Arrange
            var students = new List<StudentDTO>();
            var source = new CancellationTokenSource();
            mockStudentManager.Setup(x => x.GetAll()).ReturnsAsync(students);
            //Act
            var httpActionResult = controller.GetStudents().Result;
            var content = httpActionResult.ExecuteAsync(source.Token).Result.Content;
            var json = content.ReadAsStringAsync().Result;
            var actualResponse = JsonConvert.DeserializeObject<List<StudentDTO>>(json);
            //Assert
            actualResponse.Should().BeEquivalentTo(students);
        }

        [TestMethod]
        public void GetStudents_ShouldReturn_Status_OK__If_No_DataExists()
        {
            //Arrange
            mockStudentManager.Setup(x => x.GetAll()).ReturnsAsync(new List<StudentDTO>());
            //Act
            var httpActionResult = controller.GetStudents().Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(OkNegotiatedContentResult<List<StudentDTO>>));
        }

        [TestMethod]
        public void GetStudents_ShouldReturn_Status_InternalServerError_If_ExceptionReceived()
        {
            //Arrange
            mockStudentManager.Setup(x => x.GetAll()).ThrowsAsync(new Exception(""));
            //Act
            var httpActionResult = controller.GetStudents().Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(InternalServerErrorResult));
        }
        #endregion
        #region GetStudent
        [TestMethod]
        public void GetStudent_ShouldReturn_Status_InternalServerError_If_ExceptionReceived()
        {
            //Arrange
            var source = new CancellationTokenSource();
            mockStudentManager.Setup(x => x.Get(It.IsAny<int>())).Throws(new Exception(""));
            //Act
            var httpActionResult = controller.GetStudent(It.IsAny<int>()).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(InternalServerErrorResult));
        }

        [TestMethod]
        public void GetStudent_ShouldReturn_NotFound_If_Student_NotFound()
        {
            //Arrange
            StudentDTO student = null;
            mockStudentManager.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(student);
            //Act
            var httpActionResult = controller.GetStudent(It.IsAny<int>()).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(NotFoundResult));
        }

        [TestMethod]
        public void GetStudent_ShouldReturn_Status_Ok_If_DataExists()
        {
            //Arrange
            var student = new StudentDTO()
            {
                Id = 1,
                Name = "ABC_1",
                Birthday = new DateTime(1992, 2, 12).ToString()
            };
            mockStudentManager.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(student);
            //Act
            var httpActionResult = controller.GetStudent(It.IsAny<int>()).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(OkNegotiatedContentResult<StudentDTO>));
        }

        [TestMethod]
        public void GetStudent_ShouldReturn_Student_If_DataExists()
        {
            //Arrange
            var student = new StudentDTO()
            {
                Id = 1,
                Name = "ABC_1",
                Birthday = new DateTime(1992, 2, 12).ToString()
            };

            var source = new CancellationTokenSource();
            mockStudentManager.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(student);
            //Act
            var httpActionResult = controller.GetStudent(It.IsAny<int>()).Result;
            var content = httpActionResult.ExecuteAsync(source.Token).Result.Content;
            var json = content.ReadAsStringAsync().Result;
            var actualResponse = JsonConvert.DeserializeObject<StudentDTO>(json);
            //Assert
            actualResponse.Should().BeEquivalentTo(student);
        }

        #endregion
        #region PostStudent
        [TestMethod]
        public void PostStudent_ShouldReturn_Status_InternalServerError_If_ExceptionReceived()
        {
            //Arrange
            StudentDTO student = new StudentDTO();
            mockStudentManager.Setup(x => x.Add(It.IsAny<StudentDTO>())).Throws(new Exception(""));
            //Act
            var httpActionResult = controller.PostStudent(student).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(InternalServerErrorResult));
        }

        [TestMethod]
        public void PostStudent_ShouldReturn_Status_Created_If_DataAdded()
        {
            //Arrange
            StudentDTO request = new StudentDTO();

            mockStudentManager.Setup(x => x.Add(It.IsAny<StudentDTO>())).ReturnsAsync(It.IsAny<int>());
            //Act
            var httpActionResult = controller.PostStudent(request).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(CreatedAtRouteNegotiatedContentResult<StudentDTO>));
        }
        #endregion
        #region PutStudent
        [TestMethod]
        public void PutStudent_ShouldReturn_Status_InternalServerError_If_ExceptionReceived()
        {
            //Arrange
            StudentDTO student = new StudentDTO();
            mockStudentManager.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(student);
            mockStudentManager.Setup(x => x.Update(It.IsAny<StudentDTO>())).Throws(new Exception(""));
            //Act
            var httpActionResult = controller.PutStudent(student.Id, student).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(InternalServerErrorResult));
        }

        [TestMethod]
        public void PutStudent_ShouldReturn_Status_BadRequest_If_StudentId_NotMatched()
        {
            //Arrange
            var student = new StudentDTO()
            {
                Id = 1
            };
            int invalidId = 2;
            //Act
            var httpActionResult = controller.PutStudent(invalidId, student).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(BadRequestResult));
        }

        [TestMethod]
        public void PutStudent_ShouldReturn_Status_BadRequest_If_InvalidDataProvided()
        {
            //Arrange
            StudentDTO student = new StudentDTO();
            StudentDTO response = null;

            mockStudentManager.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(response);
            mockStudentManager.Setup(x => x.Update(It.IsAny<StudentDTO>())).ReturnsAsync(It.IsAny<int>());
            //Act
            var httpActionResult = controller.PutStudent(student.Id, student).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(BadRequestResult));
        }

        [TestMethod]
        public void PutStudent_ShouldReturn_Status_NoContent_If_DataUpdated()
        {
            //Arrange
            var student = new StudentDTO()
            {
                Id = 1,
                Name = "ABC_1",
                Birthday = new DateTime(1992, 2, 12).ToString()
            };
            mockStudentManager.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(student);
            mockStudentManager.Setup(x => x.Update(It.IsAny<StudentDTO>())).ReturnsAsync(It.IsAny<int>());
            //Act
            var httpActionResult = controller.PutStudent(student.Id, student).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(StatusCodeResult));
        }
        #endregion
        #region DeleteStudent
        [TestMethod]
        public void DeleteStudent_ShouldReturn_Status_Ok_If_DataDeleted()
        {
            //Arrange
            var student = new StudentDTO()
            {
                Id = 1,
                Name = "ABC_1",
                Birthday = new DateTime(1992, 2, 12).ToString()
            };

            mockStudentManager.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(student);
            mockStudentManager.Setup(x => x.Delete(It.IsAny<int>())).ReturnsAsync(It.IsAny<int>());
            //Act
            var httpActionResult = controller.DeleteStudent(It.IsAny<int>()).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(OkResult));
        }

        [TestMethod]
        public void DeleteStudent_ShouldReturn_Status_NotFound_If_StudentId_NotMatched()
        {
            //Arrange
            StudentDTO response = null;
            mockStudentManager.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(response);
            //Act
            var httpActionResult = controller.DeleteStudent(It.IsAny<int>()).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(NotFoundResult));
        }

        [TestMethod]
        public void DeleteStudent_ShouldReturn_Status_InternalServerError_If_ExceptionReceived()
        {
            //Arrange
            var source = new CancellationTokenSource();
            mockStudentManager.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(new StudentDTO());
            mockStudentManager.Setup(x => x.Delete(It.IsAny<int>())).ThrowsAsync(new Exception(""));
            //Act
            var httpActionResult = controller.DeleteStudent(It.IsAny<int>()).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(InternalServerErrorResult));
        }

        #endregion
    }
}
