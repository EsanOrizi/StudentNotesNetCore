using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Notes;
using Domain;

namespace API.Services
{
    public interface IStudentService
    {

        Task<List<Student>> GetAllAsync();
        Task<Student> GetDetailsAsync(Guid studentId);
        Task<Student> CreateStudentAsync(Student student);
        Task<Student> EditStudentAsync(Student student);
        Task DeleteAsync(Guid studentId);
    }
}