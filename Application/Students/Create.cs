using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Persistence.Repositories;
using Persistence.UnitOfWork;

namespace Application.Students
{
    public class Create
    {
        public class Command : IRequest
        {

            public Guid Id { get; set; }

            public string Name { get; set; }

            public string Address { get; set; }

            public string Phone { get; set; }

            public int Rate { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Name).NotEmpty();
                RuleFor(x => x.Address).NotEmpty();
                RuleFor(x => x.Phone).NotEmpty();
                RuleFor(x => x.Rate).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly IAppUserRepository _appUserRepository;
            private readonly IUserAccessor _userAccessor;
            private readonly IUnitOfWork  _unitOfWork;
            public Handler(IAppUserRepository appUserRepository, IUserAccessor userAccessor, IUnitOfWork  unitOfWork)
            {
                _userAccessor = userAccessor;
                _appUserRepository = appUserRepository;
                _unitOfWork = unitOfWork;

            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {

               var user = await _appUserRepository.FindOne(x =>
               x.UserName == _userAccessor.GetCurrentUsername());

                var student = new Student
                {
                    Id = request.Id,
                    Name = request.Name,
                    Address = request.Address,
                    Phone = request.Phone,
                    AppUserId = new Guid(user.Id)
                };

                await _unitOfWork.Students.Add(student);
                _unitOfWork.Complete();
                return Unit.Value;
            }
        }
    }
}