using System;
using System.Threading.Tasks;

namespace API.Services
{
    public interface IStudentService
    {
        Task DeleteAsync(Guid studentId);
    }
}