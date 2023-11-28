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
    /// Summary description for GradeControllerTests
    /// </summary>
    [TestClass]
    public class GradeManagerTests
    {
        private readonly Mock<IGradeDAL> mockGradeDAL;
        private readonly Mock<IGradeMapper> mockGradeMapper;
        private readonly Mock<IGradeRepository> mockGradeRepository;
        private readonly Mock<MagniDBContext> mockMagniDB;
        private IGradeManager manager;
        public GradeManagerTests()
        {
            mockMagniDB = new Mock<MagniDBContext>();
            mockGradeMapper = new Mock<IGradeMapper>();
            mockGradeRepository = new Mock<IGradeRepository>();
            mockGradeDAL = new Mock<IGradeDAL>();
            manager = new GradeManager(mockGradeDAL.Object, mockGradeMapper.Object);
        }

        [TestCleanup]
        public void CleanUp()
        {
            mockGradeMapper.Reset();
            mockMagniDB.Reset();
            mockGradeRepository.Reset();
            mockGradeDAL.Reset();
        }
        #region GetAll
        [TestMethod]
        public void GetAll_ShouldReturn_GradesList_If_DataExists()
        {
            //Arrange
            var Grades = new List<Grade>()
            {
                new Grade()
                {
                    Id = 1,
                    Title = "ABC_1",
                },
                new Grade()
                {
                    Id = 2,
                    Title = "ABC_2",
                },
                new Grade()
                {
                    Id = 3,
                    Title = "ABC_3",
                }
            };

            var GradesDTOs = new List<GradeDTO>()
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

            mockGradeMapper.Setup(x => x.Map(Grades[0])).Returns(GradesDTOs[0]);
            mockGradeMapper.Setup(x => x.Map(Grades[1])).Returns(GradesDTOs[1]);
            mockGradeMapper.Setup(x => x.Map(Grades[2])).Returns(GradesDTOs[2]);
            mockGradeDAL.Setup(x => x.GetAll()).ReturnsAsync(Grades);
            //Act
            var response = manager.GetAll().Result;
            //Assert
            response.Should().BeEquivalentTo(GradesDTOs);
        }

        [TestMethod]
        [ExpectedException(typeof(AggregateException))]
        public void GetAll_ShouldReturn_Exception_If_ExceptionReceived()
        {
            //Arrange
            mockGradeDAL.Setup(x => x.GetAll()).Throws(new Exception(""));
            //Act
            var response = manager.GetAll().Result;
        }
        #endregion
        #region Get
        [TestMethod]
        public void Get_ShouldReturn_GradesList_If_DataExists()
        {
            //Arrange
            var Grade = new Grade()
            {
                Id = 1,
                Title = "ABC_1",
            };

            var GradesDTO = new GradeDTO
            {
                Id = 3,
                Title = "ABC_3",
            };

            mockGradeMapper.Setup(x => x.Map(Grade)).Returns(GradesDTO);
            mockGradeDAL.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(Grade);
            //Act
            var response = manager.Get(It.IsAny<int>()).Result;
            //Assert
            response.Should().BeEquivalentTo(GradesDTO);
        }

        [TestMethod]
        [ExpectedException(typeof(AggregateException))]
        public void Get_ShouldReturn_Exception_If_ExceptionReceived()
        {
            //Arrange
            mockGradeDAL.Setup(x => x.Get(It.IsAny<int>())).Throws(new Exception(""));
            //Act
            var response = manager.Get(It.IsAny<int>()).Result;
        }
        #endregion
        #region Add
        [TestMethod]
        public void Add_ShouldReturn_RowCount_If_DataAdded()
        {
            //Arrange
            var Grade = new Grade()
            {
                Id = 1,
                Title = "ABC_1",
            };

            var GradesDTO = new GradeDTO
            {
                Id = 3,
                Title = "ABC_3",
            };

            var numberOfRows = 1;
            mockGradeMapper.Setup(x => x.Map(Grade, GradesDTO)).Returns(Grade);
            mockGradeDAL.Setup(x => x.Add(It.IsAny<Grade>())).ReturnsAsync(numberOfRows);
            //Act
            var response = manager.Add(GradesDTO).Result;
            //Assert
            response.Should().Be(numberOfRows);
        }

        [TestMethod]
        [ExpectedException(typeof(AggregateException))]
        public void Add_ShouldReturn_Exception_If_ExceptionReceived()
        {
            //Arrange
            mockGradeDAL.Setup(x => x.Add(It.IsAny<Grade>())).Throws(new Exception(""));
            //Act
            var response = manager.Add(new GradeDTO()).Result;
        }
        #endregion
        #region Update
        [TestMethod]
        public void Update_ShouldReturn_RowCount_If_DataAdded()
        {
            //Arrange
            var Grade = new Grade()
            {
                Id = 1,
                Title = "ABC_1",
            };

            var GradesDTO = new GradeDTO
            {
                Id = 3,
                Title = "ABC_3",
            };

            var numberOfRows = 1;
            mockGradeMapper.Setup(x => x.Map(Grade, GradesDTO)).Returns(Grade);
            mockGradeDAL.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(Grade);
            mockGradeDAL.Setup(x => x.Update(It.IsAny<Grade>())).ReturnsAsync(numberOfRows);
            //Act
            var response = manager.Update(GradesDTO).Result;
            //Assert
            response.Should().Be(numberOfRows);
        }

        [TestMethod]
        [ExpectedException(typeof(AggregateException))]
        public void Update_ShouldReturn_Exception_If_ExceptionReceived()
        {
            //Arrange
            mockGradeDAL.Setup(x => x.Update(It.IsAny<Grade>())).Throws(new Exception(""));
            //Act
            var response = manager.Update(new GradeDTO()).Result;
        }
        #endregion
        #region Delete
        [TestMethod]
        public void Delete_ShouldReturn_RowCount_If_DataAdded()
        {
            //Arrange
            var Grade = new Grade()
            {
                Id = 1,
                Title = "ABC_1",
            };
            var numberOfRows = 1;
            mockGradeDAL.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(Grade);
            mockGradeDAL.Setup(x => x.Delete(It.IsAny<Grade>())).ReturnsAsync(numberOfRows);
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
            mockGradeDAL.Setup(x => x.Delete(It.IsAny<Grade>())).Throws(new Exception(""));
            //Act
            var response = manager.Delete(It.IsAny<int>()).Result;
        }
        #endregion
    }

}
