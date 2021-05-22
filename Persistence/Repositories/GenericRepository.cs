using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;


namespace Persistence.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
    protected readonly DataContext _context;
    public GenericRepository(DataContext context)
    {
        _context = context;
    }
    public async Task Add(T entity)
    {
       await _context.Set<T>().AddAsync(entity);
    }

    public async Task<IEnumerable<T>> FindAll(Expression<Func<T, bool>> expression)
    {
       return await _context.Set<T>().Where(expression).ToListAsync();
    }
    public async Task<T> FindOne(Expression<Func<T, bool>> expression)
    {
        return await _context.Set<T>().SingleOrDefaultAsync(expression);
    }
    public async Task<List<T>> GetAll()
    {
        return await _context.Set<T>().ToListAsync();
    }
    public async Task<T> GetById(Guid id)
    {
        return await _context.Set<T>().FindAsync(id);
    }
    public void Remove(T entity)
    {
        _context.Set<T>().Remove(entity);
    }
    public async Task Save()
    {
       await _context.SaveChangesAsync();
    }
    }
}