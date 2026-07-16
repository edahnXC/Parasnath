using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using ParasnathAPI.Data;
using ParasnathAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ParasnathAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TemplesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TemplesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/temples
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Temple>>> GetTemples()
        {
            return await _context.Temples.ToListAsync();
        }

        // GET: api/temples/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Temple>> GetTemple(int id)
        {
            var temple = await _context.Temples.FindAsync(id);

            if (temple == null)
            {
                return NotFound(new { message = "Temple not found" });
            }

            return temple;
        }

        // POST: api/temples
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Temple>> PostTemple(Temple temple)
        {
            temple.CreatedAt = System.DateTime.UtcNow;
            _context.Temples.Add(temple);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTemple), new { id = temple.Id }, temple);
        }

        // PUT: api/temples/5
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTemple(int id, Temple temple)
        {
            if (id != temple.Id)
            {
                return BadRequest(new { message = "ID mismatch" });
            }

            _context.Entry(temple).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await _context.Temples.AnyAsync(e => e.Id == id))
                {
                    return NotFound(new { message = "Temple not found" });
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/temples/5
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTemple(int id)
        {
            var temple = await _context.Temples.FindAsync(id);
            if (temple == null)
            {
                return NotFound(new { message = "Temple not found" });
            }

            _context.Temples.Remove(temple);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Temple deleted successfully" });
        }
    }
}
