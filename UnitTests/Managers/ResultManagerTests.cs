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
    /// Summary description for ResultControllerTests
    /// </summary>
    [TestClass]
    public class ResultManagerTests
    {
        private readonly Mock<IResultDAL> mockResultDAL;
        private readonly Mock<IResultMapper> mockResultMapper;
        private readonly Mock<IResultRepository> mockResultRepository;
        private readonly Mock<MagniDBContext> mockMagniDB;
        private IResultManager manager;
        public ResultManagerTests()
        {
            mockMagniDB = new Mock<MagniDBContext>();
            mockResultMapper = new Mock<IResultMapper>();
            mockResultRepository = new Mock<IResultRepository>();
            mockResultDAL = new Mock<IResultDAL>();
            manager = new ResultManager(mockResultDAL.Object, mockResultMapper.Object);
        }

        [TestCleanup]
        public void CleanUp()
        {
            mockResultMapper.Reset();
            mockMagniDB.Reset();
            mockResultRepository.Reset();
            mockResultDAL.Reset();
        }
        #region GetAll
        [TestMethod]
        public void GetAll_ShouldReturn_ResultsList_If_DataExists()
        {
            //Arrange
            var Results = new List<Result>()
            {
                new Result()
                {
                    Id = 1,
                },
                new Result()
                {
                    Id = 2,
                },
                new Result()
                {
                    Id = 3,
                }
            };

            var ResultsDTOs = new List<ResultDTO>()
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

            mockResultMapper.Setup(x => x.Map(Results[0])).Returns(ResultsDTOs[0]);
            mockResultMapper.Setup(x => x.Map(Results[1])).Returns(ResultsDTOs[1]);
            mockResultMapper.Setup(x => x.Map(Results[2])).Returns(ResultsDTOs[2]);
            mockResultDAL.Setup(x => x.GetAll()).ReturnsAsync(Results);
            //Act
            var response = manager.GetAll().Result;
            //Assert
            response.Should().BeEquivalentTo(ResultsDTOs);
        }

        [TestMethod]
        [ExpectedException(typeof(AggregateException))]
        public void GetAll_ShouldReturn_Exception_If_ExceptionReceived()
        {
            //Arrange
            mockResultDAL.Setup(x => x.GetAll()).Throws(new Exception(""));
            //Act
            var response = manager.GetAll().Result;
        }
        #endregion
        #region Get
        [TestMethod]
        public void Get_ShouldReturn_ResultsList_If_DataExists()
        {
            //Arrange
            var Result = new Result()
            {
                Id = 1,
            };

            var ResultsDTO = new ResultDTO
            {
                Id = 3,
            };

            mockResultMapper.Setup(x => x.Map(Result)).Returns(ResultsDTO);
            mockResultDAL.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(Result);
            //Act
            var response = manager.Get(It.IsAny<int>()).Result;
            //Assert
            response.Should().BeEquivalentTo(ResultsDTO);
        }

        [TestMethod]
        [ExpectedException(typeof(AggregateException))]
        public void Get_ShouldReturn_Exception_If_ExceptionReceived()
        {
            //Arrange
            mockResultDAL.Setup(x => x.Get(It.IsAny<int>())).Throws(new Exception(""));
            //Act
            var response = manager.Get(It.IsAny<int>()).Result;
        }
        #endregion
        #region Add
        [TestMethod]
        public void Add_ShouldReturn_RowCount_If_DataAdded()
        {
            //Arrange
            var Result = new Result()
            {
                Id = 1,
            };

            var ResultsDTO = new ResultDTO
            {
                Id = 3,
            };

            var numberOfRows = 1;
            mockResultMapper.Setup(x => x.Map(Result, ResultsDTO)).Returns(Result);
            mockResultDAL.Setup(x => x.Add(It.IsAny<Result>())).ReturnsAsync(numberOfRows);
            //Act
            var response = manager.Add(ResultsDTO).Result;
            //Assert
            response.Should().Be(numberOfRows);
        }

        [TestMethod]
        [ExpectedException(typeof(AggregateException))]
        public void Add_ShouldReturn_Exception_If_ExceptionReceived()
        {
            //Arrange
            mockResultDAL.Setup(x => x.Add(It.IsAny<Result>())).Throws(new Exception(""));
            //Act
            var response = manager.Add(new ResultDTO()).Result;
        }
        #endregion
        #region Update
        [TestMethod]
        public void Update_ShouldReturn_RowCount_If_DataAdded()
        {
            //Arrange
            var Result = new Result()
            {
                Id = 1,
            };

            var ResultsDTO = new ResultDTO
            {
                Id = 3,
            };

            var numberOfRows = 1;
            mockResultMapper.Setup(x => x.Map(Result, ResultsDTO)).Returns(Result);
            mockResultDAL.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(Result);
            mockResultDAL.Setup(x => x.Update(It.IsAny<Result>())).ReturnsAsync(numberOfRows);
            //Act
            var response = manager.Update(ResultsDTO).Result;
            //Assert
            response.Should().Be(numberOfRows);
        }

        [TestMethod]
        [ExpectedException(typeof(AggregateException))]
        public void Update_ShouldReturn_Exception_If_ExceptionReceived()
        {
            //Arrange
            mockResultDAL.Setup(x => x.Update(It.IsAny<Result>())).Throws(new Exception(""));
            //Act
            var response = manager.Update(new ResultDTO()).Result;
        }
        #endregion
        #region Delete
        [TestMethod]
        public void Delete_ShouldReturn_RowCount_If_DataAdded()
        {
            //Arrange
            var Result = new Result()
            {
                Id = 1,
            };
            var numberOfRows = 1;
            mockResultDAL.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(Result);
            mockResultDAL.Setup(x => x.Delete(It.IsAny<Result>())).ReturnsAsync(numberOfRows);
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
            mockResultDAL.Setup(x => x.Delete(It.IsAny<Result>())).Throws(new Exception(""));
            //Act
            var response = manager.Delete(It.IsAny<int>()).Result;
        }
        #endregion
    }

}
