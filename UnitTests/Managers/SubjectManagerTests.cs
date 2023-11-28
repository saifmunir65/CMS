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
    /// Summary description for SubjectControllerTests
    /// </summary>
    [TestClass]
    public class SubjectManagerTests
    {
        private readonly Mock<ISubjectDAL> mockSubjectDAL;
        private readonly Mock<ISubjectMapper> mockSubjectMapper;
        private readonly Mock<ISubjectRepository> mockSubjectRepository;
        private readonly Mock<MagniDBContext> mockMagniDB;
        private ISubjectManager manager;
        public SubjectManagerTests()
        {
            mockMagniDB = new Mock<MagniDBContext>();
            mockSubjectMapper = new Mock<ISubjectMapper>();
            mockSubjectRepository = new Mock<ISubjectRepository>();
            mockSubjectDAL = new Mock<ISubjectDAL>();
            manager = new SubjectManager(mockSubjectDAL.Object, mockSubjectMapper.Object);
        }

        [TestCleanup]
        public void CleanUp()
        {
            mockSubjectMapper.Reset();
            mockMagniDB.Reset();
            mockSubjectRepository.Reset();
            mockSubjectDAL.Reset();
        }
        #region GetAll
        [TestMethod]
        public void GetAll_ShouldReturn_SubjectsList_If_DataExists()
        {
            //Arrange
            var Subjects = new List<Subject>()
            {
                new Subject()
                {
                    Id = 1,
                    Name = "ABC_1",
                },
                new Subject()
                {
                    Id = 2,
                    Name = "ABC_2",
                },
                new Subject()
                {
                    Id = 3,
                    Name = "ABC_3",
                }
            };

            var SubjectsDTOs = new List<SubjectDTO>()
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

            mockSubjectMapper.Setup(x => x.Map(Subjects[0])).Returns(SubjectsDTOs[0]);
            mockSubjectMapper.Setup(x => x.Map(Subjects[1])).Returns(SubjectsDTOs[1]);
            mockSubjectMapper.Setup(x => x.Map(Subjects[2])).Returns(SubjectsDTOs[2]);
            mockSubjectDAL.Setup(x => x.GetAll()).ReturnsAsync(Subjects);
            //Act
            var response = manager.GetAll().Result;
            //Assert
            response.Should().BeEquivalentTo(SubjectsDTOs);
        }

        [TestMethod]
        [ExpectedException(typeof(AggregateException))]
        public void GetAll_ShouldReturn_Exception_If_ExceptionReceived()
        {
            //Arrange
            mockSubjectDAL.Setup(x => x.GetAll()).Throws(new Exception(""));
            //Act
            var response = manager.GetAll().Result;
        }
        #endregion
        #region Get
        [TestMethod]
        public void Get_ShouldReturn_SubjectsList_If_DataExists()
        {
            //Arrange
            var Subject = new Subject()
            {
                Id = 1,
                Name = "ABC_1",
            };

            var SubjectsDTO = new SubjectDTO
            {
                Id = 3,
                Name = "ABC_3",
            };

            mockSubjectMapper.Setup(x => x.Map(Subject)).Returns(SubjectsDTO);
            mockSubjectDAL.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(Subject);
            //Act
            var response = manager.Get(It.IsAny<int>()).Result;
            //Assert
            response.Should().BeEquivalentTo(SubjectsDTO);
        }

        [TestMethod]
        [ExpectedException(typeof(AggregateException))]
        public void Get_ShouldReturn_Exception_If_ExceptionReceived()
        {
            //Arrange
            mockSubjectDAL.Setup(x => x.Get(It.IsAny<int>())).Throws(new Exception(""));
            //Act
            var response = manager.Get(It.IsAny<int>()).Result;
        }
        #endregion
        #region Add
        [TestMethod]
        public void Add_ShouldReturn_RowCount_If_DataAdded()
        {
            //Arrange
            var Subject = new Subject()
            {
                Id = 1,
                Name = "ABC_1",
            };

            var SubjectsDTO = new SubjectDTO
            {
                Id = 3,
                Name = "ABC_3",
            };

            var numberOfRows = 1;
            mockSubjectMapper.Setup(x => x.Map(Subject, SubjectsDTO)).Returns(Subject);
            mockSubjectDAL.Setup(x => x.Add(It.IsAny<Subject>())).ReturnsAsync(numberOfRows);
            //Act
            var response = manager.Add(SubjectsDTO).Result;
            //Assert
            response.Should().Be(numberOfRows);
        }

        [TestMethod]
        [ExpectedException(typeof(AggregateException))]
        public void Add_ShouldReturn_Exception_If_ExceptionReceived()
        {
            //Arrange
            mockSubjectDAL.Setup(x => x.Add(It.IsAny<Subject>())).Throws(new Exception(""));
            //Act
            var response = manager.Add(new SubjectDTO()).Result;
        }
        #endregion
        #region Update
        [TestMethod]
        public void Update_ShouldReturn_RowCount_If_DataAdded()
        {
            //Arrange
            var Subject = new Subject()
            {
                Id = 1,
                Name = "ABC_1",
            };

            var SubjectsDTO = new SubjectDTO
            {
                Id = 3,
                Name = "ABC_3",
            };

            var numberOfRows = 1;
            mockSubjectMapper.Setup(x => x.Map(Subject, SubjectsDTO)).Returns(Subject);
            mockSubjectDAL.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(Subject);
            mockSubjectDAL.Setup(x => x.Update(It.IsAny<Subject>())).ReturnsAsync(numberOfRows);
            //Act
            var response = manager.Update(SubjectsDTO).Result;
            //Assert
            response.Should().Be(numberOfRows);
        }

        [TestMethod]
        [ExpectedException(typeof(AggregateException))]
        public void Update_ShouldReturn_Exception_If_ExceptionReceived()
        {
            //Arrange
            mockSubjectDAL.Setup(x => x.Update(It.IsAny<Subject>())).Throws(new Exception(""));
            //Act
            var response = manager.Update(new SubjectDTO()).Result;
        }
        #endregion
        #region Delete
        [TestMethod]
        public void Delete_ShouldReturn_RowCount_If_DataAdded()
        {
            //Arrange
            var Subject = new Subject()
            {
                Id = 1,
                Name = "ABC_1",
            };
            var numberOfRows = 1;
            mockSubjectDAL.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(Subject);
            mockSubjectDAL.Setup(x => x.Delete(It.IsAny<Subject>())).ReturnsAsync(numberOfRows);
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
            mockSubjectDAL.Setup(x => x.Delete(It.IsAny<Subject>())).Throws(new Exception(""));
            //Act
            var response = manager.Delete(It.IsAny<int>()).Result;
        }
        #endregion
    }

}
