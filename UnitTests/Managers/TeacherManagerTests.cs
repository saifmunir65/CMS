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
    /// Summary description for TeacherControllerTests
    /// </summary>
    [TestClass]
    public class TeacherManagerTests
    {
        private readonly Mock<ITeacherDAL> mockTeacherDAL;
        private readonly Mock<ITeacherMapper> mockTeacherMapper;
        private readonly Mock<ITeacherRepository> mockTeacherRepository;
        private readonly Mock<MagniDBContext> mockMagniDB;
        private ITeacherManager manager;
        public TeacherManagerTests()
        {
            mockMagniDB = new Mock<MagniDBContext>();
            mockTeacherMapper = new Mock<ITeacherMapper>();
            mockTeacherRepository = new Mock<ITeacherRepository>();
            mockTeacherDAL = new Mock<ITeacherDAL>();
            manager = new TeacherManager(mockTeacherDAL.Object, mockTeacherMapper.Object);
        }

        [TestCleanup]
        public void CleanUp()
        {
            mockTeacherMapper.Reset();
            mockMagniDB.Reset();
            mockTeacherRepository.Reset();
            mockTeacherDAL.Reset();
        }
        #region GetAll
        [TestMethod]
        public void GetAll_ShouldReturn_TeachersList_If_DataExists()
        {
            //Arrange
            var Teachers = new List<Teacher>()
            {
                new Teacher()
                {
                    Id = 1,
                    Name = "ABC_1",
                },
                new Teacher()
                {
                    Id = 2,
                    Name = "ABC_2",
                },
                new Teacher()
                {
                    Id = 3,
                    Name = "ABC_3",
                }
            };

            var TeachersDTOs = new List<TeacherDTO>()
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

            mockTeacherMapper.Setup(x => x.Map(Teachers[0])).Returns(TeachersDTOs[0]);
            mockTeacherMapper.Setup(x => x.Map(Teachers[1])).Returns(TeachersDTOs[1]);
            mockTeacherMapper.Setup(x => x.Map(Teachers[2])).Returns(TeachersDTOs[2]);
            mockTeacherDAL.Setup(x => x.GetAll()).ReturnsAsync(Teachers);
            //Act
            var response = manager.GetAll().Result;
            //Assert
            response.Should().BeEquivalentTo(TeachersDTOs);
        }

        [TestMethod]
        [ExpectedException(typeof(AggregateException))]
        public void GetAll_ShouldReturn_Exception_If_ExceptionReceived()
        {
            //Arrange
            mockTeacherDAL.Setup(x => x.GetAll()).Throws(new Exception(""));
            //Act
            var response = manager.GetAll().Result;
        }
        #endregion
        #region Get
        [TestMethod]
        public void Get_ShouldReturn_TeachersList_If_DataExists()
        {
            //Arrange
            var Teacher = new Teacher()
            {
                Id = 1,
                Name = "ABC_1",
            };

            var TeachersDTO = new TeacherDTO
            {
                Id = 3,
                Name = "ABC_3",
            };

            mockTeacherMapper.Setup(x => x.Map(Teacher)).Returns(TeachersDTO);
            mockTeacherDAL.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(Teacher);
            //Act
            var response = manager.Get(It.IsAny<int>()).Result;
            //Assert
            response.Should().BeEquivalentTo(TeachersDTO);
        }

        [TestMethod]
        [ExpectedException(typeof(AggregateException))]
        public void Get_ShouldReturn_Exception_If_ExceptionReceived()
        {
            //Arrange
            mockTeacherDAL.Setup(x => x.Get(It.IsAny<int>())).Throws(new Exception(""));
            //Act
            var response = manager.Get(It.IsAny<int>()).Result;
        }
        #endregion
        #region Add
        [TestMethod]
        public void Add_ShouldReturn_RowCount_If_DataAdded()
        {
            //Arrange
            var Teacher = new Teacher()
            {
                Id = 1,
                Name = "ABC_1",
            };

            var TeachersDTO = new TeacherDTO
            {
                Id = 3,
                Name = "ABC_3",
            };

            var numberOfRows = 1;
            mockTeacherMapper.Setup(x => x.Map(Teacher, TeachersDTO)).Returns(Teacher);
            mockTeacherDAL.Setup(x => x.Add(It.IsAny<Teacher>())).ReturnsAsync(numberOfRows);
            //Act
            var response = manager.Add(TeachersDTO).Result;
            //Assert
            response.Should().Be(numberOfRows);
        }

        [TestMethod]
        [ExpectedException(typeof(AggregateException))]
        public void Add_ShouldReturn_Exception_If_ExceptionReceived()
        {
            //Arrange
            mockTeacherDAL.Setup(x => x.Add(It.IsAny<Teacher>())).Throws(new Exception(""));
            //Act
            var response = manager.Add(new TeacherDTO()).Result;
        }
        #endregion
        #region Update
        [TestMethod]
        public void Update_ShouldReturn_RowCount_If_DataAdded()
        {
            //Arrange
            var Teacher = new Teacher()
            {
                Id = 1,
                Name = "ABC_1",
            };

            var TeachersDTO = new TeacherDTO
            {
                Id = 3,
                Name = "ABC_3",
            };

            var numberOfRows = 1;
            mockTeacherMapper.Setup(x => x.Map(Teacher, TeachersDTO)).Returns(Teacher);
            mockTeacherDAL.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(Teacher);
            mockTeacherDAL.Setup(x => x.Update(It.IsAny<Teacher>())).ReturnsAsync(numberOfRows);
            //Act
            var response = manager.Update(TeachersDTO).Result;
            //Assert
            response.Should().Be(numberOfRows);
        }

        [TestMethod]
        [ExpectedException(typeof(AggregateException))]
        public void Update_ShouldReturn_Exception_If_ExceptionReceived()
        {
            //Arrange
            mockTeacherDAL.Setup(x => x.Update(It.IsAny<Teacher>())).Throws(new Exception(""));
            //Act
            var response = manager.Update(new TeacherDTO()).Result;
        }
        #endregion
        #region Delete
        [TestMethod]
        public void Delete_ShouldReturn_RowCount_If_DataAdded()
        {
            //Arrange
            var Teacher = new Teacher()
            {
                Id = 1,
                Name = "ABC_1",
            };
            var numberOfRows = 1;
            mockTeacherDAL.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(Teacher);
            mockTeacherDAL.Setup(x => x.Delete(It.IsAny<Teacher>())).ReturnsAsync(numberOfRows);
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
            mockTeacherDAL.Setup(x => x.Delete(It.IsAny<Teacher>())).Throws(new Exception(""));
            //Act
            var response = manager.Delete(It.IsAny<int>()).Result;
        }
        #endregion
    }

}
