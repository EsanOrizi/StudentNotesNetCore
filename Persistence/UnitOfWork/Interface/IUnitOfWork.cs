using System;
using Persistence.Repositories;

namespace Persistence.UnitOfWork
{
    public interface IUnitOfWork : IDisposable
    {
        IStudentRepository Students { get; }
        INoteRepository Notes { get; }
        int Complete();
         
    }
}