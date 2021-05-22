using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Persistence.Repositories
{
    public interface IGenericRepository<T> where T : class
    {
    Task<T> GetById(Guid id);
    Task <List<T>> GetAll();
    Task <IEnumerable<T>> FindAll(Expression<Func<T, bool>> expression);
    Task<T> FindOne(Expression<Func<T, bool>> expression);
    Task Add(T entity);
    void Remove(T entity);
    Task Save();
    }
}