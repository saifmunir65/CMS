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
    /// Summary description for ResultControllerTests
    /// </summary>
    [TestClass]
    public class ResultControllerTests
    {
        private Mock<IResultManager> mockResultManager;
        private Mock<IMagniLogger> mockMagniLogger;
        private ResultsController controller;
        public ResultControllerTests()
        {
            mockResultManager = new Mock<IResultManager>();
            mockMagniLogger = new Mock<IMagniLogger>();
            controller = new ResultsController(mockMagniLogger.Object, mockResultManager.Object);
            controller.Configuration = new System.Web.Http.HttpConfiguration();
            controller.Request = new System.Net.Http.HttpRequestMessage();
        }

        [TestCleanup]
        public void CleanUp()
        {
            mockResultManager.Reset();
            mockMagniLogger.Reset();
        }
        #region GetResults
        [TestMethod]
        public void GetResults_ShouldReturn_ResultsList_If_DataExists()
        {
            //Arrange
            var Results = new List<ResultDTO>()
            {
                new ResultDTO()
                {
                    Id = 1,
                },
                new ResultDTO()
                {
                    Id = 2,
                },
                new ResultDTO()
                {
                    Id = 3,
                }
            };

            var source = new CancellationTokenSource();
            mockResultManager.Setup(x => x.GetAll()).ReturnsAsync(Results);
            //Act
            var httpActionResult = controller.GetResults().Result;
            var content = httpActionResult.ExecuteAsync(source.Token).Result.Content;
            var json = content.ReadAsStringAsync().Result;
            var actualResponse = JsonConvert.DeserializeObject<List<ResultDTO>>(json);
            //Assert
            actualResponse.Should().BeEquivalentTo(Results);
            Assert.IsInstanceOfType(httpActionResult, typeof(OkNegotiatedContentResult<List<ResultDTO>>));
        }

        [TestMethod]
        public void GetResults_ShouldReturn_Status_OK__If_DataExists()
        {
            //Arrange
            var Results = new List<ResultDTO>()
            {
                new ResultDTO()
                {
                    Id = 1,
                },
                new ResultDTO()
                {
                    Id = 2,
                },
                new ResultDTO()
                {
                    Id = 3,
                }
            };
            mockResultManager.Setup(x => x.GetAll()).ReturnsAsync(Results);
            //Act
            var httpActionResult = controller.GetResults().Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(OkNegotiatedContentResult<List<ResultDTO>>));
        }

        [TestMethod]
        public void GetResults_ShouldReturn_EmptyResultsList_If_No_DataExists()
        {
            //Arrange
            var Results = new List<ResultDTO>();
            var source = new CancellationTokenSource();
            mockResultManager.Setup(x => x.GetAll()).ReturnsAsync(Results);
            //Act
            var httpActionResult = controller.GetResults().Result;
            var content = httpActionResult.ExecuteAsync(source.Token).Result.Content;
            var json = content.ReadAsStringAsync().Result;
            var actualResponse = JsonConvert.DeserializeObject<List<ResultDTO>>(json);
            //Assert
            actualResponse.Should().BeEquivalentTo(Results);
        }

        [TestMethod]
        public void GetResults_ShouldReturn_Status_OK__If_No_DataExists()
        {
            //Arrange
            mockResultManager.Setup(x => x.GetAll()).ReturnsAsync(new List<ResultDTO>());
            //Act
            var httpActionResult = controller.GetResults().Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(OkNegotiatedContentResult<List<ResultDTO>>));
        }

        [TestMethod]
        public void GetResults_ShouldReturn_Status_InternalServerError_If_ExceptionReceived()
        {
            //Arrange
            mockResultManager.Setup(x => x.GetAll()).ThrowsAsync(new Exception(""));
            //Act
            var httpActionResult = controller.GetResults().Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(InternalServerErrorResult));
        }
        #endregion
        #region GetResult
        [TestMethod]
        public void GetResult_ShouldReturn_Status_InternalServerError_If_ExceptionReceived()
        {
            //Arrange
            var source = new CancellationTokenSource();
            mockResultManager.Setup(x => x.Get(It.IsAny<int>())).Throws(new Exception(""));
            //Act
            var httpActionResult = controller.GetResult(It.IsAny<int>()).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(InternalServerErrorResult));
        }

        [TestMethod]
        public void GetResult_ShouldReturn_NotFound_If_Result_NotFound()
        {
            //Arrange
            ResultDTO Result = null;
            mockResultManager.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(Result);
            //Act
            var httpActionResult = controller.GetResult(It.IsAny<int>()).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(NotFoundResult));
        }

        [TestMethod]
        public void GetResult_ShouldReturn_Status_Ok_If_DataExists()
        {
            //Arrange
            var Result = new ResultDTO()
            {
                Id = 1,
            };
            mockResultManager.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(Result);
            //Act
            var httpActionResult = controller.GetResult(It.IsAny<int>()).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(OkNegotiatedContentResult<ResultDTO>));
        }

        [TestMethod]
        public void GetResult_ShouldReturn_Result_If_DataExists()
        {
            //Arrange
            var Result = new ResultDTO()
            {
                Id = 1,
            };

            var source = new CancellationTokenSource();
            mockResultManager.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(Result);
            //Act
            var httpActionResult = controller.GetResult(It.IsAny<int>()).Result;
            var content = httpActionResult.ExecuteAsync(source.Token).Result.Content;
            var json = content.ReadAsStringAsync().Result;
            var actualResponse = JsonConvert.DeserializeObject<ResultDTO>(json);
            //Assert
            actualResponse.Should().BeEquivalentTo(Result);
        }

        #endregion
        #region PostResult
        [TestMethod]
        public void PostResult_ShouldReturn_Status_InternalServerError_If_ExceptionReceived()
        {
            //Arrange
            ResultDTO Result = new ResultDTO();
            mockResultManager.Setup(x => x.Add(It.IsAny<ResultDTO>())).Throws(new Exception(""));
            //Act
            var httpActionResult = controller.PostResult(Result).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(InternalServerErrorResult));
        }

        [TestMethod]
        public void PostResult_ShouldReturn_Status_Created_If_DataAdded()
        {
            //Arrange
            ResultDTO request = new ResultDTO();

            mockResultManager.Setup(x => x.Add(It.IsAny<ResultDTO>())).ReturnsAsync(It.IsAny<int>());
            //Act
            var httpActionResult = controller.PostResult(request).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(CreatedAtRouteNegotiatedContentResult<ResultDTO>));
        }
        #endregion
        #region PutResult
        [TestMethod]
        public void PutResult_ShouldReturn_Status_InternalServerError_If_ExceptionReceived()
        {
            //Arrange
            ResultDTO Result = new ResultDTO();
            mockResultManager.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(Result);
            mockResultManager.Setup(x => x.Update(It.IsAny<ResultDTO>())).Throws(new Exception(""));
            //Act
            var httpActionResult = controller.PutResult(Result.Id, Result).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(InternalServerErrorResult));
        }

        [TestMethod]
        public void PutResult_ShouldReturn_Status_BadRequest_If_ResultId_NotMatched()
        {
            //Arrange
            var Result = new ResultDTO()
            {
                Id = 1
            };
            int invalidId = 2;
            //Act
            var httpActionResult = controller.PutResult(invalidId, Result).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(BadRequestResult));
        }

        [TestMethod]
        public void PutResult_ShouldReturn_Status_BadRequest_If_InvalidDataProvided()
        {
            //Arrange
            ResultDTO Result = new ResultDTO();
            ResultDTO response = null;

            mockResultManager.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(response);
            mockResultManager.Setup(x => x.Update(It.IsAny<ResultDTO>())).ReturnsAsync(It.IsAny<int>());
            //Act
            var httpActionResult = controller.PutResult(Result.Id, Result).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(BadRequestResult));
        }

        [TestMethod]
        public void PutResult_ShouldReturn_Status_NoContent_If_DataUpdated()
        {
            //Arrange
            var Result = new ResultDTO()
            {
                Id = 1,
            };
            mockResultManager.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(Result);
            mockResultManager.Setup(x => x.Update(It.IsAny<ResultDTO>())).ReturnsAsync(It.IsAny<int>());
            //Act
            var httpActionResult = controller.PutResult(Result.Id, Result).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(StatusCodeResult));
        }
        #endregion
        #region DeleteResult
        [TestMethod]
        public void DeleteResult_ShouldReturn_Status_Ok_If_DataDeleted()
        {
            //Arrange
            var Result = new ResultDTO()
            {
                Id = 1,
            };

            mockResultManager.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(Result);
            mockResultManager.Setup(x => x.Delete(It.IsAny<int>())).ReturnsAsync(It.IsAny<int>());
            //Act
            var httpActionResult = controller.DeleteResult(It.IsAny<int>()).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(OkResult));
        }

        [TestMethod]
        public void DeleteResult_ShouldReturn_Status_NotFound_If_ResultId_NotMatched()
        {
            //Arrange
            ResultDTO response = null;
            mockResultManager.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(response);
            //Act
            var httpActionResult = controller.DeleteResult(It.IsAny<int>()).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(NotFoundResult));
        }

        [TestMethod]
        public void DeleteResult_ShouldReturn_Status_InternalServerError_If_ExceptionReceived()
        {
            //Arrange
            var source = new CancellationTokenSource();
            mockResultManager.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(new ResultDTO());
            mockResultManager.Setup(x => x.Delete(It.IsAny<int>())).ThrowsAsync(new Exception(""));
            //Act
            var httpActionResult = controller.DeleteResult(It.IsAny<int>()).Result;
            //Assert
            Assert.IsInstanceOfType(httpActionResult, typeof(InternalServerErrorResult));
        }

        #endregion
    }
}
