using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        private readonly DataContext _context;
        public StudentsController(DataContext context)
        {
            _context = context;
        }

        // GET api/students
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Student>>> Get()
        {
            var values = await _context.Students.ToListAsync();
            return Ok(values);
        }

        // GET api/students/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Student>> Get(int id)
        {
            var value = await _context.Students.FindAsync(id);
            return Ok(value);
        }

        // POST api/students
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/students/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/students/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
