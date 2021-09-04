using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{

    public class StudentsController : BaseController
    {
        private readonly IStudentService _studentService;

        public StudentsController(IStudentService studentService)
        {
            _studentService = studentService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Student>>> List()
        {
            var students = await _studentService.GetAllAsync();
            return students;
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<Student>> Details(Guid id)
        {
            var student = await _studentService.GetDetailsAsync(id);
            return student;
        }

        [HttpPost]
        public async Task<ActionResult<Student>> Create(Student student)
        {
            await _studentService.CreateStudentAsync(student);
            return student;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Student>> Edit(Student student)
        {
            await _studentService.EditStudentAsync(student);
            return student;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Student>> Delete(Guid id)
        {
            await _studentService.DeleteAsync(id);
            return NoContent();
        }

    }
}