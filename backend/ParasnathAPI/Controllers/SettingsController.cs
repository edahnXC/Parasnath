using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using ParasnathAPI.Data;
using ParasnathAPI.Models;

namespace ParasnathAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SettingsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SettingsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<Dictionary<string, string>>> GetSettings()
        {
            var settings = await _context.SiteSettings.ToListAsync();
            return settings.ToDictionary(s => s.Key, s => s.Value);
        }

        [Authorize]
        [HttpPut]
        public async Task<IActionResult> UpdateSettings(Dictionary<string, string> settings)
        {
            foreach (var kvp in settings)
            {
                var setting = await _context.SiteSettings.FindAsync(kvp.Key);
                if (setting != null)
                {
                    setting.Value = kvp.Value;
                }
                else
                {
                    _context.SiteSettings.Add(new SiteSetting { Key = kvp.Key, Value = kvp.Value });
                }
            }
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
