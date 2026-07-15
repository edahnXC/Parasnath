using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using ParasnathAPI.Data;
using ParasnathAPI.Models;

namespace ParasnathAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GalleryController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public GalleryController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<GalleryImage>>> GetGallery()
        {
            return await _context.GalleryImages.OrderByDescending(g => g.CreatedAt).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GalleryImage>> GetGalleryImage(int id)
        {
            var image = await _context.GalleryImages.FindAsync(id);

            if (image == null)
            {
                return NotFound();
            }

            return image;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<GalleryImage>> PostGalleryImage(GalleryImage image)
        {
            _context.GalleryImages.Add(image);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetGalleryImage), new { id = image.Id }, image);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGalleryImage(int id)
        {
            var image = await _context.GalleryImages.FindAsync(id);
            if (image == null)
            {
                return NotFound();
            }

            _context.GalleryImages.Remove(image);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
