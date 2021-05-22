using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using FluentValidation;
using MediatR;
using Persistence.Repositories;

namespace Application.Students
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }

            public string Name { get; set; }

            public string Address { get; set; }

            public string Phone { get; set; }

            public int? Rate { get; set; }
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
            private readonly IStudentRepository _studentRepository;
            public Handler(IStudentRepository studentRepository)
            {
                _studentRepository = studentRepository;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {

                var student = await _studentRepository.GetById(request.Id);

                if (student == null)
                    throw new RestException(HttpStatusCode.NotFound, new { student = "Not Found" });

                student.Name = request.Name ?? student.Name;
                student.Address = request.Address ?? student.Address;
                student.Phone = request.Phone ?? student.Phone;
                student.Rate = request.Rate ?? student.Rate;

                await _studentRepository.Save();

                return Unit.Value;

            }
        }
    }
}