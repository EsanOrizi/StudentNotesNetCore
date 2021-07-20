using System;
using System.Net;
using System.Threading.Tasks;
using API.Controllers;
using Application.Errors;
using Application.Interfaces;
using Domain;
using FluentAssertions;
using Moq;
using Persistence.Repositories;
using Persistence.UnitOfWork;
using Xunit;

namespace TestProject
{
    public class StudentControllerTests
    {
        private readonly StudentsController _studentsController;

        private readonly Mock<IUnitOfWork> _iUnitOfWorkMock = new Mock<IUnitOfWork>();
        private readonly Mock<IAppUserRepository> _iAppUserRepository = new Mock<IAppUserRepository>();
        private readonly Mock<IUserAccessor> _iUserAccessor = new Mock<IUserAccessor>();


        public StudentControllerTests()
        {
            _studentsController = new StudentsController(_iAppUserRepository.Object, _iUserAccessor.Object, _iUnitOfWorkMock.Object);
        }


        [Fact]
        public async Task Details_ShouldReturnStudent_WhenStudentExists()
        {
            // Arrange
            var studentId = Guid.NewGuid();
            var testStudent = new Student
            {
                Id = studentId,
                Name = "Esan",
                Address = "3 Anvil Court",
                Phone = "07523242324",
                Rate = 20
            };

            _iUnitOfWorkMock.Setup(x => x.Students.GetById(studentId)).ReturnsAsync(testStudent);
            
            // Act
            var student = await _studentsController.Details(studentId);

            // Assert
            Assert.Equal(testStudent.Id, student.Value.Id);
            Assert.Equal(testStudent.Name, student.Value.Name);
            Assert.Equal(testStudent.Address, student.Value.Address);
            Assert.Equal(testStudent.Phone, student.Value.Phone);
            Assert.Equal(testStudent.Rate, student.Value.Rate);
        }


        [Fact]
        public async Task Details_ShouldThrowException_WhenStudentDoesNotExists()
        {
            // Arrange
            _iUnitOfWorkMock.Setup(x => x.Students.GetById(It.IsAny<Guid>()))
                .ReturnsAsync(() => null);

            // Act
            
            // Assert
            await Assert.ThrowsAsync<RestException>(() =>  _studentsController.Details(Guid.NewGuid()));
       
        }
        
        
        
    }
}