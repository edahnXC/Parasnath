using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;

namespace ParasnathAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ConfigController : ControllerBase
    {
        private readonly IConfiguration _config;

        public ConfigController(IConfiguration config)
        {
            _config = config;
        }

        [HttpGet]
        public IActionResult GetConfig()
        {
            var mapsKey = Environment.GetEnvironmentVariable("GOOGLE_MAPS_API_KEY") 
                          ?? _config["GoogleMaps:ApiKey"] 
                          ?? string.Empty;

            return Ok(new
            {
                googleMapsApiKey = mapsKey
            });
        }
    }
}
