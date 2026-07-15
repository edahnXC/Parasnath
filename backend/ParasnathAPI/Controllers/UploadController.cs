using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using System;
using System.IO;
using System.Threading.Tasks;

namespace ParasnathAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UploadController : ControllerBase
    {
        private readonly Cloudinary? _cloudinary;
        private readonly string _uploadsFolder;
        private readonly ILogger<UploadController> _logger;

        public UploadController(IConfiguration config, ILogger<UploadController> logger)
        {
            _logger = logger;

            // Initialize local uploads folder as fallback
            _uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
            if (!Directory.Exists(_uploadsFolder))
            {
                Directory.CreateDirectory(_uploadsFolder);
            }

            // Initialize Cloudinary if credentials are configured
            var cloudName = config["Cloudinary:CloudName"];
            var apiKey = config["Cloudinary:ApiKey"];
            var apiSecret = config["Cloudinary:ApiSecret"];

            if (!string.IsNullOrEmpty(cloudName) && !string.IsNullOrEmpty(apiKey) && !string.IsNullOrEmpty(apiSecret))
            {
                var account = new Account(cloudName, apiKey, apiSecret);
                _cloudinary = new Cloudinary(account);
                _cloudinary.Api.Secure = true;
                _logger.LogInformation("Cloudinary initialized successfully for cloud: {CloudName}", cloudName);
            }
            else
            {
                _logger.LogWarning("Cloudinary credentials not configured. Falling back to local file storage.");
            }
        }

        // POST: api/upload
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> UploadImage(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest(new { message = "No file uploaded" });
            }

            // Validate file type
            var extension = Path.GetExtension(file.FileName).ToLower();
            if (extension != ".jpg" && extension != ".jpeg" && extension != ".png" && extension != ".webp" && extension != ".gif")
            {
                return BadRequest(new { message = "Only image uploads are allowed (.jpg, .jpeg, .png, .webp, .gif)" });
            }

            // Validate file size (max 10MB)
            if (file.Length > 10 * 1024 * 1024)
            {
                return BadRequest(new { message = "File size exceeds 10MB limit" });
            }

            try
            {
                // Use Cloudinary if configured, otherwise fall back to local storage
                if (_cloudinary != null)
                {
                    return await UploadToCloudinary(file);
                }
                else
                {
                    return await UploadToLocal(file, extension);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Image upload failed");
                return StatusCode(500, new { message = $"Image upload failed: {ex.Message}" });
            }
        }

        private async Task<IActionResult> UploadToCloudinary(IFormFile file)
        {
            using var stream = file.OpenReadStream();

            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription(file.FileName, stream),
                Folder = "parasnath",
                Transformation = new Transformation()
                    .Quality("auto")
                    .FetchFormat("auto")
            };

            var uploadResult = await _cloudinary!.UploadAsync(uploadParams);

            if (uploadResult.Error != null)
            {
                _logger.LogError("Cloudinary upload error: {Error}", uploadResult.Error.Message);
                return StatusCode(500, new { message = $"Cloudinary upload failed: {uploadResult.Error.Message}" });
            }

            _logger.LogInformation("Image uploaded to Cloudinary: {Url}", uploadResult.SecureUrl);
            return Ok(new { imageUrl = uploadResult.SecureUrl.ToString() });
        }

        private async Task<IActionResult> UploadToLocal(IFormFile file, string extension)
        {
            var fileName = $"{Guid.NewGuid()}{extension}";
            var filePath = Path.Combine(_uploadsFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var request = HttpContext.Request;
            var imageUrl = $"{request.Scheme}://{request.Host}/uploads/{fileName}";

            _logger.LogInformation("Image uploaded locally: {Url}", imageUrl);
            return Ok(new { imageUrl });
        }
    }
}
