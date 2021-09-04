using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Application.Notes;
using Domain;
using Persistence.Repositories;
using Persistence.UnitOfWork;

namespace API.Services
{
    public class StudentService : IStudentService
    {

        private readonly IAppUserRepository _appUserRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUserAccessor _userAccessor;

        public StudentService(IAppUserRepository appUserRepository, IUnitOfWork unitOfWork, IUserAccessor userAccessor)
        {
            _unitOfWork = unitOfWork;
            _userAccessor = userAccessor;
            _appUserRepository = appUserRepository;
        }

        public async Task<List<Student>> GetAllAsync()
        {
            var user = await _appUserRepository.FindOne(x => x.UserName == _userAccessor.GetCurrentUsername());
            var students = (List<Student>)await _unitOfWork.Students.FindAll(x => x.AppUserId == new Guid(user.Id));
            return students;
        }


        public async Task<Student> GetDetailsAsync(Guid id)
        {
            var student = await _unitOfWork.Students.GetById(id);
            if (student == null)
                throw new RestException(HttpStatusCode.NotFound, new { student = "Not Found" });

            return student;
        }

        
        public async Task<Student> CreateStudentAsync(Student student)
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

        public async Task<Student> EditStudentAsync(Student student)
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


        public async Task DeleteAsync(Guid Id)
        {
            var student = await _unitOfWork.Students.GetById(Id);
            if (student == null)
                throw new RestException(HttpStatusCode.NotFound, new { student = "Not Found" });
            
            _unitOfWork.Students.Remove(student);
            _unitOfWork.Complete();
        }
    }
}