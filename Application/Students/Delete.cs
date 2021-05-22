using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence.Repositories;

namespace Application.Students
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }

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

                _studentRepository.Remove(student);
                await _studentRepository.Save();

                return Unit.Value;


            }
        }
    }
}