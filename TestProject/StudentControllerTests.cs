using System;
using System.Threading.Tasks;
using API.Controllers;
using API.Services;
using Application.Errors;
using Application.Interfaces;
using Domain;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Persistence.Repositories;
using Persistence.UnitOfWork;
using Xunit;

namespace TestProject
{
    public class StudentControllerTests
    {
        
        private readonly Mock<IStudentService> _iStudentServiceMock = new Mock<IStudentService>();
        private readonly StudentsController _studentsController;

        public StudentControllerTests()
        {
            _studentsController = new StudentsController(_iStudentServiceMock.Object);
        }

         
        [Fact]
        public async void Details_ShouldReturnStudent_WhenStudentExists()
        {
            var studentId = Guid.NewGuid();
            var testStudent = new Student
            {
                Id = studentId,
                Name = "Esan",
                Address = "3 Anvil Court",
                Phone = "07523242324",
                Rate = 20
            };

            _iStudentServiceMock.Setup(x => x.GetDetailsAsync(studentId)).ReturnsAsync(testStudent);
             var student = await _studentsController.Details(studentId);
            
            student.Value.Should().BeEquivalentTo(testStudent);
        }

       
        
        [Fact]
        public async void Edit_ShouldEditStudent_WhenStudentExists()
        {
            var studentId = Guid.NewGuid();
            var testStudentInDatabase = new Student
            {
                Id = studentId,
                Name = "Esan",
                Address = "3 Anvil Court",
                Phone = "07523242324",
                Rate = 20
            };

           _iStudentServiceMock.Setup(x => x.GetDetailsAsync(studentId)).ReturnsAsync(testStudentInDatabase);
            var result =  await _studentsController.Edit(testStudentInDatabase);

            result.Value.Should().BeEquivalentTo(testStudentInDatabase);
        }



        [Fact]
        public async void Delete_ToDeleteStudent_WhenStudentExists()
        {
            var studentId = Guid.NewGuid();
            var testStudent = new Student
            {
                Id = studentId,
                Name = "Esan",
                Address = "3 Anvil Court",
                Phone = "07523242324",
                Rate = 20
            };
            
            _iStudentServiceMock.Setup(x => x.GetDetailsAsync(studentId)).ReturnsAsync(testStudent);
             var result = await _studentsController.Delete(testStudent.Id);

            result.Value.Should().NotBeEquivalentTo(testStudent);
        }



    }
}