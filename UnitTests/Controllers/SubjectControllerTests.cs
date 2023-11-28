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
    /// Summary description for Subject ControllerTests
    /// </summary>
    [TestClass]
    public class SubjectControllerTests
    {
        private Mock<ISubjectManager> mockSubjectManager;
        private Mock<IMagniLogger> mockMagniLogger;
        private SubjectsController controller;
        public SubjectControllerTests()
        {
            mockSubjectManager = new Mock<ISubjectManager>();
            mockMagniLogger = new Mock<IMagniLogger>();
            controller = new SubjectsController(mockMagniLogger.Object, mockSubjectManager.Object);
            controller.Configuration = new System.Web.Http.HttpConfiguration();
            controller.Request = new System.Net.Http.HttpRequestMessage();
        }

        [TestCleanup]
        public void CleanUp()
        {
            mockSubjectManager.Reset();
            mockMagniLogger.Reset();
        }
        #region GetSubjects
        [TestMethod]
        public void GetSubjects_ShouldReturn_SubjectsList_If_DataExists()
        {
            //Arrange
            var Subjects = new List<SubjectDTO>()
            {
                new SubjectDTO()
                {
                    Id = 1,
                    Name = "ABC_1",
                },
                new SubjectDTO()
                {
                    Id = 2,
                    Name = "ABC_2",
                },
                new SubjectDTO()
                {
                    Id = 3,
                    Name = "ABC_3",
                }
            };

            var source = new CancellationTokenSource();
            mockSubjectManager.Setup(x => x.GetAll()).ReturnsAsync(Subjects);
            //Act
            var httpActionResult = controller.GetSubjects().Result;
            var content = httpActionResult.ExecuteAsync(source.Token).Result.Content;
            var json = content.ReadAsStringAsync().Result;
            var actualResponse = JsonConvert.DeserializeObject<List<SubjectDTO>>(json);
            //Assert
            actualResponse.Should().BeEquivalentTo(Subjects);
            Assert.IsInstanceOfType(httpActionResult, typeof(OkNegotiatedContentResult<List<SubjectDTO>>));
        }

        [TestMethod]
        public void GetSubjects_ShouldReturn_Status_OK__If_DataExists()
        {
            //Arrange
            var Subjects = new List<SubjectDTO>()
            {
                new SubjectDTO()
                {
                    Id = 1,
                    Name = "ABC_1",
                },
                new SubjectDTO()
                {
                    Id = 2,
                    Name = "ABC_2",
                },
                new SubjectDTO()
                {
                    Id = 3,
                    Name = "ABC_3",
                }
            };
            mockSubjectManager.Setup(x => x.GetAll()).ReturnsAsync(Subjects);
            //Act
            var httpActionResult = controller.GetSubjects().Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(OkNegotiatedContentResult<List<SubjectDTO>>));
        }

        [TestMethod]
        public void GetSubjects_ShouldReturn_EmptySubjectsList_If_No_DataExists()
        {
            //Arrange
            var Subjects = new List<SubjectDTO>();
            var source = new CancellationTokenSource();
            mockSubjectManager.Setup(x => x.GetAll()).ReturnsAsync(Subjects);
            //Act
            var httpActionResult = controller.GetSubjects().Result;
            var content = httpActionResult.ExecuteAsync(source.Token).Result.Content;
            var json = content.ReadAsStringAsync().Result;
            var actualResponse = JsonConvert.DeserializeObject<List<SubjectDTO>>(json);
            //Assert
            actualResponse.Should().BeEquivalentTo(Subjects);
        }

        [TestMethod]
        public void GetSubjects_ShouldReturn_Status_OK__If_No_DataExists()
        {
            //Arrange
            mockSubjectManager.Setup(x => x.GetAll()).ReturnsAsync(new List<SubjectDTO>());
            //Act
            var httpActionResult = controller.GetSubjects().Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(OkNegotiatedContentResult<List<SubjectDTO>>));
        }

        [TestMethod]
        public void GetSubjects_ShouldReturn_Status_InternalServerError_If_ExceptionReceived()
        {
            //Arrange
            mockSubjectManager.Setup(x => x.GetAll()).ThrowsAsync(new Exception(""));
            //Act
            var httpActionResult = controller.GetSubjects().Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(InternalServerErrorResult));
        }
        #endregion
        #region GetSubject
        [TestMethod]
        public void GetSubject_ShouldReturn_Status_InternalServerError_If_ExceptionReceived()
        {
            //Arrange
            var source = new CancellationTokenSource();
            mockSubjectManager.Setup(x => x.Get(It.IsAny<int>())).Throws(new Exception(""));
            //Act
            var httpActionResult = controller.GetSubject(It.IsAny<int>()).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(InternalServerErrorResult));
        }

        [TestMethod]
        public void GetSubject_ShouldReturn_NotFound_If_Subject_NotFound()
        {
            //Arrange
            SubjectDTO Subject = null;
            mockSubjectManager.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(Subject);
            //Act
            var httpActionResult = controller.GetSubject(It.IsAny<int>()).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(NotFoundResult));
        }

        [TestMethod]
        public void GetSubject_ShouldReturn_Status_Ok_If_DataExists()
        {
            //Arrange
            var Subject = new SubjectDTO()
            {
                Id = 1,
                Name = "ABC_1",
            };
            mockSubjectManager.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(Subject);
            //Act
            var httpActionResult = controller.GetSubject(It.IsAny<int>()).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(OkNegotiatedContentResult<SubjectDTO>));
        }

        [TestMethod]
        public void GetSubject_ShouldReturn_Subject_If_DataExists()
        {
            //Arrange
            var Subject = new SubjectDTO()
            {
                Id = 1,
                Name = "ABC_1",
            };

            var source = new CancellationTokenSource();
            mockSubjectManager.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(Subject);
            //Act
            var httpActionResult = controller.GetSubject(It.IsAny<int>()).Result;
            var content = httpActionResult.ExecuteAsync(source.Token).Result.Content;
            var json = content.ReadAsStringAsync().Result;
            var actualResponse = JsonConvert.DeserializeObject<SubjectDTO>(json);
            //Assert
            actualResponse.Should().BeEquivalentTo(Subject);
        }

        #endregion
        #region PostSubject
        [TestMethod]
        public void PostSubject_ShouldReturn_Status_InternalServerError_If_ExceptionReceived()
        {
            //Arrange
            SubjectDTO Subject = new SubjectDTO();
            mockSubjectManager.Setup(x => x.Add(It.IsAny<SubjectDTO>())).Throws(new Exception(""));
            //Act
            var httpActionResult = controller.PostSubject(Subject).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(InternalServerErrorResult));
        }

        [TestMethod]
        public void PostSubject_ShouldReturn_Status_Created_If_DataAdded()
        {
            //Arrange
            SubjectDTO request = new SubjectDTO();

            mockSubjectManager.Setup(x => x.Add(It.IsAny<SubjectDTO>())).ReturnsAsync(It.IsAny<int>());
            //Act
            var httpActionResult = controller.PostSubject(request).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(CreatedAtRouteNegotiatedContentResult<SubjectDTO>));
        }
        #endregion
        #region PutSubject
        [TestMethod]
        public void PutSubject_ShouldReturn_Status_InternalServerError_If_ExceptionReceived()
        {
            //Arrange
            SubjectDTO Subject = new SubjectDTO();
            mockSubjectManager.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(Subject);
            mockSubjectManager.Setup(x => x.Update(It.IsAny<SubjectDTO>())).Throws(new Exception(""));
            //Act
            var httpActionResult = controller.PutSubject(Subject.Id, Subject).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(InternalServerErrorResult));
        }

        [TestMethod]
        public void PutSubject_ShouldReturn_Status_BadRequest_If_SubjectId_NotMatched()
        {
            //Arrange
            var Subject = new SubjectDTO()
            {
                Id = 1
            };
            int invalidId = 2;
            //Act
            var httpActionResult = controller.PutSubject(invalidId, Subject).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(BadRequestResult));
        }

        [TestMethod]
        public void PutSubject_ShouldReturn_Status_BadRequest_If_InvalidDataProvided()
        {
            //Arrange
            SubjectDTO Subject = new SubjectDTO();
            SubjectDTO response = null;

            mockSubjectManager.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(response);
            mockSubjectManager.Setup(x => x.Update(It.IsAny<SubjectDTO>())).ReturnsAsync(It.IsAny<int>());
            //Act
            var httpActionResult = controller.PutSubject(Subject.Id, Subject).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(BadRequestResult));
        }

        [TestMethod]
        public void PutSubject_ShouldReturn_Status_NoContent_If_DataUpdated()
        {
            //Arrange
            var Subject = new SubjectDTO()
            {
                Id = 1,
                Name = "ABC_1",
            };
            mockSubjectManager.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(Subject);
            mockSubjectManager.Setup(x => x.Update(It.IsAny<SubjectDTO>())).ReturnsAsync(It.IsAny<int>());
            //Act
            var httpActionResult = controller.PutSubject(Subject.Id, Subject).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(StatusCodeResult));
        }
        #endregion
        #region DeleteSubject
        [TestMethod]
        public void DeleteSubject_ShouldReturn_Status_Ok_If_DataDeleted()
        {
            //Arrange
            var Subject = new SubjectDTO()
            {
                Id = 1,
                Name = "ABC_1",
            };

            mockSubjectManager.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(Subject);
            mockSubjectManager.Setup(x => x.Delete(It.IsAny<int>())).ReturnsAsync(It.IsAny<int>());
            //Act
            var httpActionResult = controller.DeleteSubject(It.IsAny<int>()).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(OkResult));
        }

        [TestMethod]
        public void DeleteSubject_ShouldReturn_Status_NotFound_If_SubjectId_NotMatched()
        {
            //Arrange
            SubjectDTO response = null;
            mockSubjectManager.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(response);
            //Act
            var httpActionResult = controller.DeleteSubject(It.IsAny<int>()).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(NotFoundResult));
        }

        [TestMethod]
        public void DeleteSubject_ShouldReturn_Status_InternalServerError_If_ExceptionReceived()
        {
            //Arrange
            var source = new CancellationTokenSource();
            mockSubjectManager.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(new SubjectDTO());
            mockSubjectManager.Setup(x => x.Delete(It.IsAny<int>())).ThrowsAsync(new Exception(""));
            //Act
            var httpActionResult = controller.DeleteSubject(It.IsAny<int>()).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(InternalServerErrorResult));
        }

        #endregion
    }
}
