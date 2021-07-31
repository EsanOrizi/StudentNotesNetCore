using Application.Errors;
using Application.Interfaces;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Persistence.Repositories;
using Persistence.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

namespace API.Controllers
{

    public class StudentsController : BaseController
    {
        private readonly IAppUserRepository _appUserRepository;
        private readonly IUserAccessor _userAccessor;
        private readonly IUnitOfWork _unitOfWork;
        
        public StudentsController(IAppUserRepository appUserRepository,
                    IUserAccessor userAccessor, IUnitOfWork unitOfWork)
        {
            _userAccessor = userAccessor;
            _appUserRepository = appUserRepository;
            _unitOfWork = unitOfWork;

        }

        [HttpGet]
        public async Task<ActionResult<List<Student>>> List()
        {
            var user = await _appUserRepository.FindOne(x => x.UserName == _userAccessor.GetCurrentUsername());

            var students = (List<Student>)await _unitOfWork.Students.FindAll(x => x.AppUserId == new Guid(user.Id));

            return students;
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<Student>> Details(Guid id)
        {
            var student = await _unitOfWork.Students.GetById(id);

            if (student == null)
                throw new RestException(HttpStatusCode.NotFound, new { student = "Not Found" });

            return student;
        }

        [HttpPost]
        public async Task<ActionResult<Student>> Create(Student student)
        {
      
            var user = await _appUserRepository.FindOne(x =>
              x.UserName == _userAccessor.GetCurrentUsername());

            Student newStudent = new Student
            {
                Id = student.Id,
                Name = student.Name,
                Address = student.Address,
                Phone = student.Phone,
                AppUserId = new Guid(user.Id),
                Rate = student.Rate,
            };

            await _unitOfWork.Students.Add(newStudent);
             _unitOfWork.Complete();
            return student;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Student>> Edit(Student student)
        {
            var studentInDatabase = await _unitOfWork.Students.GetById(student.Id);

            if (student == null)
                throw new RestException(HttpStatusCode.NotFound, new { student = "Not Found" });

            studentInDatabase.Name = student.Name;
            studentInDatabase.Address = student.Address;
            studentInDatabase.Phone = student.Phone;
            studentInDatabase.Rate = student.Rate;

            _unitOfWork.Complete();

            return student;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Student>> Delete(Guid id)
        {
            var student = await _unitOfWork.Students.GetById(id);

            if (student == null)
                throw new RestException(HttpStatusCode.NotFound, new { student = "Not Found" });
            
            _unitOfWork.Students.Remove(student);
            _unitOfWork.Complete();

            return student;
        }

    }
}