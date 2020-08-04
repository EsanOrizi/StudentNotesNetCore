using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Students
{
    public class List
    {
        public class Query : IRequest<List<Student>> { }

        public class Handler : IRequestHandler<Query, List<Student>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }

            public async Task<List<Student>> Handle(Query request, CancellationToken cancellationToken)
            {
                var students = await _context.Students.ToListAsync();

                return students;
            }
        }
    }



}
