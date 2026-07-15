using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ParasnathAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;

        public AuthController(IConfiguration config)
        {
            _config = config;
        }

        public class LoginRequest
        {
            public string Password { get; set; } = string.Empty;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            var adminPassword = _config["AuthSettings:AdminPassword"];
            
            if (request.Password == adminPassword)
            {
                var token = GenerateJwtToken();
                return Ok(new { token });
            }
            
            return Unauthorized(new { message = "Invalid password" });
        }

        private string GenerateJwtToken()
        {
            var jwtSecret = _config["AuthSettings:JwtSecret"];
            if (string.IsNullOrEmpty(jwtSecret)) 
            {
                throw new InvalidOperationException("JwtSecret is missing in configuration.");
            }
            var securityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtSecret));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.Role, "Admin"),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(
                issuer: _config["AuthSettings:JwtIssuer"],
                audience: _config["AuthSettings:JwtAudience"],
                claims: claims,
                expires: DateTime.Now.AddDays(7),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
