using System;
using System.Net;
using System.Threading.Tasks;
using Application.Errors;

namespace API.Services
{
    public class StudentService : IStudentService
    {
        public Task DeleteAsync(Guid studentId)
        {
            var student = await _unitOfWork.Students.GetById(id);

            if (student == null)
                throw new RestException(HttpStatusCode.NotFound, new { student = "Not Found" });
            
            _unitOfWork.Students.Remove(student);
            _unitOfWork.Complete();
        }
    }
}