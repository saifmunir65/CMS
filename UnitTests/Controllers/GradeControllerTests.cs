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
    /// Summary description for GradeControllerTests
    /// </summary>
    [TestClass]
    public class GradeControllerTests
    {
        private Mock<IGradeManager> mockGradeManager;
        private Mock<IMagniLogger> mockMagniLogger;
        private GradesController controller;
        public GradeControllerTests()
        {
            mockGradeManager = new Mock<IGradeManager>();
            mockMagniLogger = new Mock<IMagniLogger>();
            controller = new GradesController(mockMagniLogger.Object, mockGradeManager.Object);
            controller.Configuration = new System.Web.Http.HttpConfiguration();
            controller.Request = new System.Net.Http.HttpRequestMessage();
        }

        [TestCleanup]
        public void CleanUp()
        {
            mockGradeManager.Reset();
            mockMagniLogger.Reset();
        }
        #region GetGrades
        [TestMethod]
        public void GetGrades_ShouldReturn_GradesList_If_DataExists()
        {
            //Arrange
            var Grades = new List<GradeDTO>()
            {
                new GradeDTO()
                {
                    Id = 1,
                    Title = "ABC_1",
                },
                new GradeDTO()
                {
                    Id = 2,
                    Title = "ABC_2",
                },
                new GradeDTO()
                {
                    Id = 3,
                    Title = "ABC_3",
                }
            };

            var source = new CancellationTokenSource();
            mockGradeManager.Setup(x => x.GetAll()).ReturnsAsync(Grades);
            //Act
            var httpActionResult = controller.GetGrades().Result;
            var content = httpActionResult.ExecuteAsync(source.Token).Result.Content;
            var json = content.ReadAsStringAsync().Result;
            var actualResponse = JsonConvert.DeserializeObject<List<GradeDTO>>(json);
            //Assert
            actualResponse.Should().BeEquivalentTo(Grades);
            Assert.IsInstanceOfType(httpActionResult, typeof(OkNegotiatedContentResult<List<GradeDTO>>));
        }

        [TestMethod]
        public void GetGrades_ShouldReturn_Status_OK__If_DataExists()
        {
            //Arrange
            var Grades = new List<GradeDTO>()
            {
                new GradeDTO()
                {
                    Id = 1,
                    Title = "ABC_1",
                },
                new GradeDTO()
                {
                    Id = 2,
                    Title = "ABC_2",
                },
                new GradeDTO()
                {
                    Id = 3,
                    Title = "ABC_3",
                }
            };
            mockGradeManager.Setup(x => x.GetAll()).ReturnsAsync(Grades);
            //Act
            var httpActionResult = controller.GetGrades().Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(OkNegotiatedContentResult<List<GradeDTO>>));
        }

        [TestMethod]
        public void GetGrades_ShouldReturn_EmptyGradesList_If_No_DataExists()
        {
            //Arrange
            var Grades = new List<GradeDTO>();
            var source = new CancellationTokenSource();
            mockGradeManager.Setup(x => x.GetAll()).ReturnsAsync(Grades);
            //Act
            var httpActionResult = controller.GetGrades().Result;
            var content = httpActionResult.ExecuteAsync(source.Token).Result.Content;
            var json = content.ReadAsStringAsync().Result;
            var actualResponse = JsonConvert.DeserializeObject<List<GradeDTO>>(json);
            //Assert
            actualResponse.Should().BeEquivalentTo(Grades);
        }

        [TestMethod]
        public void GetGrades_ShouldReturn_Status_OK__If_No_DataExists()
        {
            //Arrange
            mockGradeManager.Setup(x => x.GetAll()).ReturnsAsync(new List<GradeDTO>());
            //Act
            var httpActionResult = controller.GetGrades().Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(OkNegotiatedContentResult<List<GradeDTO>>));
        }

        [TestMethod]
        public void GetGrades_ShouldReturn_Status_InternalServerError_If_ExceptionReceived()
        {
            //Arrange
            mockGradeManager.Setup(x => x.GetAll()).ThrowsAsync(new Exception(""));
            //Act
            var httpActionResult = controller.GetGrades().Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(InternalServerErrorResult));
        }
        #endregion
        #region GetGrade
        [TestMethod]
        public void GetGrade_ShouldReturn_Status_InternalServerError_If_ExceptionReceived()
        {
            //Arrange
            var source = new CancellationTokenSource();
            mockGradeManager.Setup(x => x.Get(It.IsAny<int>())).Throws(new Exception(""));
            //Act
            var httpActionResult = controller.GetGrade(It.IsAny<int>()).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(InternalServerErrorResult));
        }

        [TestMethod]
        public void GetGrade_ShouldReturn_NotFound_If_Grade_NotFound()
        {
            //Arrange
            GradeDTO Grade = null;
            mockGradeManager.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(Grade);
            //Act
            var httpActionResult = controller.GetGrade(It.IsAny<int>()).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(NotFoundResult));
        }

        [TestMethod]
        public void GetGrade_ShouldReturn_Status_Ok_If_DataExists()
        {
            //Arrange
            var Grade = new GradeDTO()
            {
                Id = 1,
                Title = "ABC_1",
            };
            mockGradeManager.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(Grade);
            //Act
            var httpActionResult = controller.GetGrade(It.IsAny<int>()).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(OkNegotiatedContentResult<GradeDTO>));
        }

        [TestMethod]
        public void GetGrade_ShouldReturn_Grade_If_DataExists()
        {
            //Arrange
            var Grade = new GradeDTO()
            {
                Id = 1,
                Title = "ABC_1",
            };

            var source = new CancellationTokenSource();
            mockGradeManager.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(Grade);
            //Act
            var httpActionResult = controller.GetGrade(It.IsAny<int>()).Result;
            var content = httpActionResult.ExecuteAsync(source.Token).Result.Content;
            var json = content.ReadAsStringAsync().Result;
            var actualResponse = JsonConvert.DeserializeObject<GradeDTO>(json);
            //Assert
            actualResponse.Should().BeEquivalentTo(Grade);
        }

        #endregion
        #region PostGrade
        [TestMethod]
        public void PostGrade_ShouldReturn_Status_InternalServerError_If_ExceptionReceived()
        {
            //Arrange
            GradeDTO Grade = new GradeDTO();
            mockGradeManager.Setup(x => x.Add(It.IsAny<GradeDTO>())).Throws(new Exception(""));
            //Act
            var httpActionResult = controller.PostGrade(Grade).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(InternalServerErrorResult));
        }

        [TestMethod]
        public void PostGrade_ShouldReturn_Status_Created_If_DataAdded()
        {
            //Arrange
            GradeDTO request = new GradeDTO();

            mockGradeManager.Setup(x => x.Add(It.IsAny<GradeDTO>())).ReturnsAsync(It.IsAny<int>());
            //Act
            var httpActionResult = controller.PostGrade(request).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(CreatedAtRouteNegotiatedContentResult<GradeDTO>));
        }
        #endregion
        #region PutGrade
        [TestMethod]
        public void PutGrade_ShouldReturn_Status_InternalServerError_If_ExceptionReceived()
        {
            //Arrange
            GradeDTO Grade = new GradeDTO();
            mockGradeManager.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(Grade);
            mockGradeManager.Setup(x => x.Update(It.IsAny<GradeDTO>())).Throws(new Exception(""));
            //Act
            var httpActionResult = controller.PutGrade(Grade.Id, Grade).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(InternalServerErrorResult));
        }

        [TestMethod]
        public void PutGrade_ShouldReturn_Status_BadRequest_If_GradeId_NotMatched()
        {
            //Arrange
            var Grade = new GradeDTO()
            {
                Id = 1
            };
            int invalidId = 2;
            //Act
            var httpActionResult = controller.PutGrade(invalidId, Grade).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(BadRequestResult));
        }

        [TestMethod]
        public void PutGrade_ShouldReturn_Status_BadRequest_If_InvalidDataProvided()
        {
            //Arrange
            GradeDTO Grade = new GradeDTO();
            GradeDTO response = null;

            mockGradeManager.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(response);
            mockGradeManager.Setup(x => x.Update(It.IsAny<GradeDTO>())).ReturnsAsync(It.IsAny<int>());
            //Act
            var httpActionResult = controller.PutGrade(Grade.Id, Grade).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(BadRequestResult));
        }

        [TestMethod]
        public void PutGrade_ShouldReturn_Status_NoContent_If_DataUpdated()
        {
            //Arrange
            var Grade = new GradeDTO()
            {
                Id = 1,
                Title = "ABC_1",
            };
            mockGradeManager.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(Grade);
            mockGradeManager.Setup(x => x.Update(It.IsAny<GradeDTO>())).ReturnsAsync(It.IsAny<int>());
            //Act
            var httpActionResult = controller.PutGrade(Grade.Id, Grade).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(StatusCodeResult));
        }
        #endregion
        #region DeleteGrade
        [TestMethod]
        public void DeleteGrade_ShouldReturn_Status_Ok_If_DataDeleted()
        {
            //Arrange
            var Grade = new GradeDTO()
            {
                Id = 1,
                Title = "ABC_1",
            };

            mockGradeManager.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(Grade);
            mockGradeManager.Setup(x => x.Delete(It.IsAny<int>())).ReturnsAsync(It.IsAny<int>());
            //Act
            var httpActionResult = controller.DeleteGrade(It.IsAny<int>()).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(OkResult));
        }

        [TestMethod]
        public void DeleteGrade_ShouldReturn_Status_NotFound_If_GradeId_NotMatched()
        {
            //Arrange
            GradeDTO response = null;
            mockGradeManager.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(response);
            //Act
            var httpActionResult = controller.DeleteGrade(It.IsAny<int>()).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(NotFoundResult));
        }

        [TestMethod]
        public void DeleteGrade_ShouldReturn_Status_InternalServerError_If_ExceptionReceived()
        {
            //Arrange
            var source = new CancellationTokenSource();
            mockGradeManager.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(new GradeDTO());
            mockGradeManager.Setup(x => x.Delete(It.IsAny<int>())).ThrowsAsync(new Exception(""));
            //Act
            var httpActionResult = controller.DeleteGrade(It.IsAny<int>()).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(InternalServerErrorResult));
        }

        #endregion
    }
}
