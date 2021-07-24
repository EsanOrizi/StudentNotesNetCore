using System;
using System.Threading.Tasks;
using API.Controllers;
using Application.Errors;
using Application.Interfaces;
using Domain;
using FluentAssertions;
using Infrastructure.Security;
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
            _studentsController = new StudentsController(_iAppUserRepository.Object,
                                     _iUserAccessor.Object, _iUnitOfWorkMock.Object);
        }


        // List tests
       


        // Details tests

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
            student.Value.Id.Should().Be(testStudent.Id);
            student.Value.Name.Should().Be(testStudent.Name);
            student.Value.Address.Should().Be(testStudent.Address);
            student.Value.Phone.Should().Be(testStudent.Phone);
            student.Value.Rate.Should().Be(testStudent.Rate);

          }


        [Fact]
        public void Details_ShouldThrowException_WhenStudentDoesNotExists()
        {
            // Arrange
            _iUnitOfWorkMock.Setup(x => x.Students.GetById(It.IsAny<Guid>()))
                .ReturnsAsync(() => null);

            // Act
            Func<Task> nullStudent = () => _studentsController.Details(Guid.NewGuid());

            // Assert
            //  await Assert.ThrowsAsync<RestException>(nullStudent);
            nullStudent.Should().Throw<RestException>();
        }



        // Edit tests


        // Delete test

        [Fact]
       public async void Delete_ToRunComplete_WhenStudentExists()
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
           await _studentsController.Delete(testStudent.Id);
           
           // Assert
           _iUnitOfWorkMock.Verify(x => x.Complete(), Times.Once);

       }
       
       [Fact]
       public void Delete_ToThrowException_WhenStudentDoesNotExists()
       {
           
           // Arrange
           _iUnitOfWorkMock.Setup(x => x.Students.GetById(It.IsAny<Guid>()))
               .ReturnsAsync(() => null);

           // Act
           Func<Task> nullStudent =  () => _studentsController.Details(Guid.NewGuid());
            
           // Assert
           //  await Assert.ThrowsAsync<RestException>(nullStudent);
           nullStudent.Should().Throw<RestException>();
           
       }


    }
}