using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using MediatR;
using Persistence.Repositories;

namespace Application.Students
{
    public class List
    {
        public class Query : IRequest<List<Student>> { }

        public class Handler : IRequestHandler<Query, List<Student>>
        {
            private readonly IAppUserRepository _appUserRepository;
            private readonly IUserAccessor _userAccessor;
            private readonly IStudentRepository _studentRepository;
            public Handler(IAppUserRepository appUserRepository, IUserAccessor userAccessor, IStudentRepository studentRepository)
            {
                _userAccessor = userAccessor;
                _appUserRepository = appUserRepository;
                _studentRepository = studentRepository;

            }

            public async Task<List<Student>> Handle(Query request, CancellationToken cancellationToken)
            {

               var user = await _appUserRepository.FindOne(x =>
               x.UserName == _userAccessor.GetCurrentUsername());

                var students = (List<Student>) await _studentRepository.FindAll(x => x.AppUserId == new Guid(user.Id));
              
                return students;
            }
        }
    }



}
