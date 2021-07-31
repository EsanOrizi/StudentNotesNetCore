using Application.Errors;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Persistence.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

namespace API.Controllers
{


    public class NotesController : BaseController
    {

        private readonly IUnitOfWork _unitOfWork;
        public NotesController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;

        }

        [HttpGet]
        public async Task<ActionResult<List<Note>>> List()
        {
            var notes = await _unitOfWork.Notes.GetAll();
            return notes;
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Note>> Details(Guid id)
        {
            var note = await _unitOfWork.Notes.GetById(id);

            if (note == null)
                throw new RestException(HttpStatusCode.NotFound, new { note = "Not Found" });

            return note;
        }


        [HttpPost]
        public async Task<ActionResult<Note>> Create(Note note)
        {
            var newNote = new Note
            {
                Id = note.Id,
                Name = note.Name,
                ProgressRating = note.ProgressRating,
                ExtraNote = note.ExtraNote,
                DateAdded = note.DateAdded,
                StudentId = note.StudentId

            };

            await _unitOfWork.Notes.Add(note);
            _unitOfWork.Complete();

            return note;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Note>> Edit(Note note)
        {
            var noteInDatabase = await _unitOfWork.Notes.GetById(note.Id);

            if (noteInDatabase == null)
                throw new RestException(HttpStatusCode.NotFound, new { note = "Not Found" });

            noteInDatabase.Name = note.Name;
            noteInDatabase.ProgressRating = note.ProgressRating;
            noteInDatabase.ExtraNote = note.ExtraNote;
            noteInDatabase.DateAdded = note.DateAdded;
            noteInDatabase.StudentId = note.StudentId;

            _unitOfWork.Complete();

            return note;
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult<Note>> Delete(Guid id)
        {
            var note = await _unitOfWork.Notes.GetById(id);

            if (note == null)
                throw new RestException(HttpStatusCode.NotFound, new { note = "Not Found" });

            _unitOfWork.Notes.Remove(note);
            _unitOfWork.Complete();
            return note;
        }
    }
}