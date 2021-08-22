using System;
using System.Threading.Tasks;
using API.Controllers;
using Application.Errors;
using Domain;
using FluentAssertions;
using Moq;
using Persistence.UnitOfWork;
using Xunit;

namespace TestProject
{
    public class NotesControllerTests
    {
        private readonly NotesController _notesController;
        private readonly Mock<IUnitOfWork> _iUnitOfWorkMock = new Mock<IUnitOfWork>();

        public NotesControllerTests()
        {
            _notesController = new NotesController(_iUnitOfWorkMock.Object);
        }

      

        [Fact]
        public async Task Details_ShouldGetNoteDetails()
        {
            // Arrange
            var noteId = Guid.NewGuid();
            var studentId = Guid.NewGuid();
            var noteDate = DateTime.Now;

            var testNote = new Note
            {
                Id = noteId,
                Name = "Stopping",
                ProgressRating = "2",
                ExtraNote = "No Note",
                DateAdded = noteDate,
                StudentId = studentId 

            };

            _iUnitOfWorkMock.Setup(x => x.Notes.GetById(noteId)).ReturnsAsync(testNote);

            // Act
            var note = await _notesController.Details(noteId);

            // Assert
            note.Value.Id.Should().Be(testNote.Id);
            note.Value.Name.Should().Be(testNote.Name);
            note.Value.ProgressRating.Should().Be(testNote.ProgressRating);
            note.Value.ExtraNote.Should().Be(testNote.ExtraNote);
            note.Value.DateAdded.Should().Be(testNote.DateAdded);
            note.Value.StudentId.Should().Be(testNote.StudentId);

        }


        [Fact]
        public void Details_ShouldThrowException_WhenNoteDoesNotExists()
        {
            // Arrange
            _iUnitOfWorkMock.Setup(x => x.Notes.GetById(It.IsAny<Guid>()))
                .ReturnsAsync(() => null);

            // Act
            Func<Task> nullNote = () => _notesController.Details(Guid.NewGuid());

            // Assert
            nullNote.Should().Throw<RestException>();
        }


       

        // Edit tests
        [Fact]
        public async Task Edit_ShouldEditNote_WhenNoteExists()
        {
            // Arrange
            var noteId = Guid.NewGuid();
            var studentId = Guid.NewGuid();
            var noteDate = DateTime.Now;

            var testNoteInDatabase = new Note
            {
                Id = noteId,
                Name = "Stopping",
                ProgressRating = "2",
                ExtraNote = "No Note",
                DateAdded = noteDate,
                StudentId = studentId

            };


            _iUnitOfWorkMock.Setup(x => x.Notes.GetById(noteId)).ReturnsAsync(testNoteInDatabase);


            var testNoteEdited = new Note
            {
                Id = noteId,
                Name = "Moving Off",
                ProgressRating = "5",
                ExtraNote = "Do more",
                DateAdded = noteDate,
                StudentId = studentId
            };


            // Act
            await _notesController.Edit(testNoteEdited);

            // Assert
            testNoteInDatabase.Id.Should().Be(testNoteEdited.Id);
            testNoteInDatabase.Name.Should().Be(testNoteEdited.Name);
            testNoteInDatabase.ProgressRating.Should().Be(testNoteEdited.ProgressRating);
            testNoteInDatabase.ExtraNote.Should().Be(testNoteEdited.ExtraNote);
            testNoteInDatabase.DateAdded.Should().Be(testNoteEdited.DateAdded);
            testNoteInDatabase.StudentId.Should().Be(testNoteEdited.StudentId);

            _iUnitOfWorkMock.Verify(x => x.Complete(), Times.Once);

        }


        // Delete tests
        [Fact]
        public async void Delete_ToRunComplete_WhenNoteExists()
        {
            // Arrange
            var noteId = Guid.NewGuid();
            var studentId = Guid.NewGuid();
            var noteDate = DateTime.Now;

            var testNote = new Note
            {
                Id = noteId,
                Name = "Stopping",
                ProgressRating = "2",
                ExtraNote = "No Note",
                DateAdded = noteDate,
                StudentId = studentId

            };

            _iUnitOfWorkMock.Setup(x => x.Notes.GetById(noteId)).ReturnsAsync(testNote);

            // Act
            await _notesController.Delete(testNote.Id);

            // Assert
            _iUnitOfWorkMock.Verify(x => x.Complete(), Times.Once);

        }

        [Fact]
        public void Delete_ToThrowException_WhenNoteDoesNotExists()
        {

            // Arrange
            _iUnitOfWorkMock.Setup(x => x.Notes.GetById(It.IsAny<Guid>()))
                .ReturnsAsync(() => null);

            // Act
            Func<Task> nullNote = () => _notesController.Delete(Guid.NewGuid());

            // Assert
            nullNote.Should().Throw<RestException>();

        }



    }
}
