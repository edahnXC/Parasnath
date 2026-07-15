using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using ParasnathAPI.Data;
using ParasnathAPI.Models;

namespace ParasnathAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EcoController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public EcoController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EcoItem>>> GetEcoItems([FromQuery] string? type)
        {
            var query = _context.EcoItems.AsQueryable();
            if (!string.IsNullOrEmpty(type) && type != "all")
            {
                query = query.Where(e => e.Type == type);
            }
            return await query.OrderByDescending(e => e.CreatedAt).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EcoItem>> GetEcoItem(int id)
        {
            var item = await _context.EcoItems.FindAsync(id);

            if (item == null)
            {
                return NotFound();
            }

            return item;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<EcoItem>> PostEcoItem(EcoItem item)
        {
            _context.EcoItems.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEcoItem), new { id = item.Id }, item);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEcoItem(int id)
        {
            var item = await _context.EcoItems.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            _context.EcoItems.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
