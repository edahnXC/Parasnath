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
    [Route("api/trekking-routes")] // Match old express path /api/trekking-routes
    public class TrekkingRoutesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TrekkingRoutesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/trekking-routes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TrekkingRoute>>> GetTrekkingRoutes()
        {
            return await _context.TrekkingRoutes
                .Include(r => r.Waypoints)
                .ToListAsync();
        }

        // GET: api/trekking-routes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TrekkingRoute>> GetTrekkingRoute(int id)
        {
            var route = await _context.TrekkingRoutes
                .Include(r => r.Waypoints)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (route == null)
            {
                return NotFound(new { message = "Trekking route not found" });
            }

            return route;
        }

        // POST: api/trekking-routes
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<TrekkingRoute>> PostTrekkingRoute(TrekkingRoute route)
        {
            route.CreatedAt = System.DateTime.UtcNow;
            _context.TrekkingRoutes.Add(route);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTrekkingRoute), new { id = route.Id }, route);
        }

        // PUT: api/trekking-routes/5
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTrekkingRoute(int id, TrekkingRoute route)
        {
            if (id != route.Id)
            {
                return BadRequest(new { message = "ID mismatch" });
            }

            var existingRoute = await _context.TrekkingRoutes
                .Include(r => r.Waypoints)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (existingRoute == null)
            {
                return NotFound(new { message = "Trekking route not found" });
            }

            existingRoute.Name = route.Name;
            existingRoute.Difficulty = route.Difficulty;
            existingRoute.Distance = route.Distance;
            existingRoute.Duration = route.Duration;
            existingRoute.StartingPoint = route.StartingPoint;
            existingRoute.Description = route.Description;
            existingRoute.MainImage = route.MainImage;

            _context.Waypoints.RemoveRange(existingRoute.Waypoints);
            existingRoute.Waypoints = route.Waypoints;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await _context.TrekkingRoutes.AnyAsync(e => e.Id == id))
                {
                    return NotFound(new { message = "Trekking route not found" });
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/trekking-routes/5
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTrekkingRoute(int id)
        {
            var route = await _context.TrekkingRoutes.FindAsync(id);
            if (route == null)
            {
                return NotFound(new { message = "Trekking route not found" });
            }

            _context.TrekkingRoutes.Remove(route);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Trekking route deleted successfully" });
        }
    }
}
