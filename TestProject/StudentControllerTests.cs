using System;
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
        private readonly Mock<IAppUserRepository> _iAppUserRepositoryMock = new Mock<IAppUserRepository>();
        private readonly Mock<IUserAccessor> _iUserAccessorMock = new Mock<IUserAccessor>();


        public StudentControllerTests()
        {
            _studentsController = new StudentsController(_iAppUserRepositoryMock.Object,
                                     _iUserAccessorMock.Object, _iUnitOfWorkMock.Object);
        }


     
        // Details tests //
        [Fact]
        public async void Details_ShouldReturnStudent_WhenStudentExists()
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
            nullStudent.Should().Throw<RestException>();
        }

     

        // Edit tests //
        [Fact]
        public async void Edit_ShouldEditStudent_WhenStudentExists()
        {
            // Arrange
            var studentId = Guid.NewGuid();
            var testStudentInDatabase = new Student
            {
                Id = studentId,
                Name = "Esan",
                Address = "3 Anvil Court",
                Phone = "07523242324",
                Rate = 20
            };

          
            _iUnitOfWorkMock.Setup(x => x.Students.GetById(studentId)).ReturnsAsync(testStudentInDatabase);


            var testStudentEdited = new Student
            {
                Id = studentId,
                Name = "Massa",
                Address = "40 Denzil Avenue",
                Phone = "07523242324",
                Rate = 30
            };


            // Act
             await _studentsController.Edit(testStudentEdited);

            // Assert
            testStudentInDatabase.Id.Should().Be(testStudentEdited.Id);
            testStudentInDatabase.Name.Should().Be(testStudentEdited.Name);
            testStudentInDatabase.Address.Should().Be(testStudentEdited.Address);
            testStudentInDatabase.Phone.Should().Be(testStudentEdited.Phone);
            testStudentInDatabase.Rate.Should().Be(testStudentEdited.Rate);

            _iUnitOfWorkMock.Verify(x => x.Complete(), Times.Once);

        }

                
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
           nullStudent.Should().Throw<RestException>();
           
       }


    }
}