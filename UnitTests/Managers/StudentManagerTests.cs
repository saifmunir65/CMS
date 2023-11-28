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
    /// Summary description for StudentControllerTests
    /// </summary>
    [TestClass]
    public class StudentManagerTests
    {
        private readonly Mock<IStudentDAL> mockStudentDAL;
        private readonly Mock<IStudentMapper> mockStudentMapper;
        private readonly Mock<IStudentRepository> mockStudentRepository;
        private readonly Mock<MagniDBContext> mockMagniDB;
        private IStudentManager manager;
        public StudentManagerTests()
        {
            mockMagniDB = new Mock<MagniDBContext>();
            mockStudentMapper = new Mock<IStudentMapper>();
            mockStudentRepository = new Mock<IStudentRepository>();
            mockStudentDAL = new Mock<IStudentDAL>();
            manager = new StudentManager(mockStudentDAL.Object, mockStudentMapper.Object);
        }

        [TestCleanup]
        public void CleanUp()
        {
            mockStudentMapper.Reset();
            mockMagniDB.Reset();
            mockStudentRepository.Reset();
            mockStudentDAL.Reset();
        }
        #region GetAll
        [TestMethod]
        public void GetAll_ShouldReturn_StudentsList_If_DataExists()
        {
            //Arrange
            var students = new List<Student>()
            {
                new Student()
                {
                    Id = 1,
                    Name = "ABC_1",
                    Birthday = new DateTime(1992,2,12)
                },
                new Student()
                {
                    Id = 2,
                    Name = "ABC_2",
                    Birthday = new DateTime(1995,2,12)
                },
                new Student()
                {
                    Id = 3,
                    Name = "ABC_3",
                    Birthday = new DateTime(1996,2,12)
                }
            };

            var studentsDTOs = new List<StudentDTO>()
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

            mockStudentMapper.Setup(x => x.Map(students[0])).Returns(studentsDTOs[0]);
            mockStudentMapper.Setup(x => x.Map(students[1])).Returns(studentsDTOs[1]);
            mockStudentMapper.Setup(x => x.Map(students[2])).Returns(studentsDTOs[2]);
            mockStudentDAL.Setup(x => x.GetAll()).ReturnsAsync(students);
            //Act
            var response = manager.GetAll().Result;
            //Assert
            response.Should().BeEquivalentTo(studentsDTOs);
        }

        [TestMethod]
        [ExpectedException(typeof(AggregateException))]
        public void GetAll_ShouldReturn_Exception_If_ExceptionReceived()
        {
            //Arrange
            mockStudentDAL.Setup(x => x.GetAll()).Throws(new Exception(""));
            //Act
            var response = manager.GetAll().Result;
        }
        #endregion
        #region Get
        [TestMethod]
        public void Get_ShouldReturn_StudentsList_If_DataExists()
        {
            //Arrange
            var student = new Student()
            {
                Id = 1,
                Name = "ABC_1",
                Birthday = new DateTime(1992, 2, 12)
            };

            var studentsDTO = new StudentDTO
            {
                Id = 3,
                Name = "ABC_3",
                Birthday = new DateTime(1996, 2, 12).ToString()
            };

            mockStudentMapper.Setup(x => x.Map(student)).Returns(studentsDTO);
            mockStudentDAL.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(student);
            //Act
            var response = manager.Get(It.IsAny<int>()).Result;
            //Assert
            response.Should().BeEquivalentTo(studentsDTO);
        }

        [TestMethod]
        [ExpectedException(typeof(AggregateException))]
        public void Get_ShouldReturn_Exception_If_ExceptionReceived()
        {
            //Arrange
            mockStudentDAL.Setup(x => x.Get(It.IsAny<int>())).Throws(new Exception(""));
            //Act
            var response = manager.Get(It.IsAny<int>()).Result;
        }
        #endregion
        #region Add
        [TestMethod]
        public void Add_ShouldReturn_RowCount_If_DataAdded()
        {
            //Arrange
            var student = new Student()
            {
                Id = 1,
                Name = "ABC_1",
                Birthday = new DateTime(1992, 2, 12)
            };

            var studentsDTO = new StudentDTO
            {
                Id = 3,
                Name = "ABC_3",
                Birthday = new DateTime(1996, 2, 12).ToString()
            };

            var numberOfRows = 1;
            mockStudentMapper.Setup(x => x.Map(student, studentsDTO)).Returns(student);
            mockStudentDAL.Setup(x => x.Add(It.IsAny<Student>())).ReturnsAsync(numberOfRows);
            //Act
            var response = manager.Add(studentsDTO).Result;
            //Assert
            response.Should().Be(numberOfRows);
        }

        [TestMethod]
        [ExpectedException(typeof(AggregateException))]
        public void Add_ShouldReturn_Exception_If_ExceptionReceived()
        {
            //Arrange
            mockStudentDAL.Setup(x => x.Add(It.IsAny<Student>())).Throws(new Exception(""));
            //Act
            var response = manager.Add(new StudentDTO()).Result;
        }
        #endregion
        #region Update
        [TestMethod]
        public void Update_ShouldReturn_RowCount_If_DataAdded()
        {
            //Arrange
            var student = new Student()
            {
                Id = 1,
                Name = "ABC_1",
                Birthday = new DateTime(1992, 2, 12)
            };

            var studentsDTO = new StudentDTO
            {
                Id = 3,
                Name = "ABC_3",
                Birthday = new DateTime(1996, 2, 12).ToString()
            };

            var numberOfRows = 1;
            mockStudentMapper.Setup(x => x.Map(student, studentsDTO)).Returns(student);
            mockStudentDAL.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(student);
            mockStudentDAL.Setup(x => x.Update(It.IsAny<Student>())).ReturnsAsync(numberOfRows);
            //Act
            var response = manager.Update(studentsDTO).Result;
            //Assert
            response.Should().Be(numberOfRows);
        }

        [TestMethod]
        [ExpectedException(typeof(AggregateException))]
        public void Update_ShouldReturn_Exception_If_ExceptionReceived()
        {
            //Arrange
            mockStudentDAL.Setup(x => x.Update(It.IsAny<Student>())).Throws(new Exception(""));
            //Act
            var response = manager.Update(new StudentDTO()).Result;
        }
        #endregion
        #region Delete
        [TestMethod]
        public void Delete_ShouldReturn_RowCount_If_DataAdded()
        {
            //Arrange
            var student = new Student()
            {
                Id = 1,
                Name = "ABC_1",
                Birthday = new DateTime(1992, 2, 12)
            };
            var numberOfRows = 1;
            mockStudentDAL.Setup(x => x.Get(It.IsAny<int>())).ReturnsAsync(student);
            mockStudentDAL.Setup(x => x.Delete(It.IsAny<Student>())).ReturnsAsync(numberOfRows);
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
            mockStudentDAL.Setup(x => x.Delete(It.IsAny<Student>())).Throws(new Exception(""));
            //Act
            var response = manager.Delete(It.IsAny<int>()).Result;
        }
        #endregion
    }

}
