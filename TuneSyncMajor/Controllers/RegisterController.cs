using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TuneSyncMajor.Data;
using TuneSyncMajor.Models;

namespace TuneSyncMajor.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private readonly RegisterContext _context;
        private readonly string _uploadUserProfile = @"C:\Users\divyeshl\source\repos\TuneSyncMajorProject\Angular\AngularFrontEnd\src\assets\profileImages";

        public RegisterController(RegisterContext registercontext)
        {
            _context = registercontext;
            EnsureUploadFolderExists();
        }

        private void EnsureUploadFolderExists()
        {
            
            var uploadsProfileFolderPath = Path.Combine(Directory.GetCurrentDirectory(), _uploadUserProfile);

            if (!Directory.Exists(uploadsProfileFolderPath))
                Directory.CreateDirectory(uploadsProfileFolderPath);
        }


        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _context.Users.ToListAsync();
            return Ok(users);
        }


        [HttpPost("register")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> RegisterNewUser(string name, string username, string email, string password, string phone, int role, int isApproved, int isDeleted, IFormFile imageFile)
        {
            // Basic input validation
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
            {
                return BadRequest("Username, email, and password are required.");
            }

            // Check if the username or email already exists in the database
            if (await _context.Users.AnyAsync(u => u.UserName == username))
            {
                return Conflict("Username already exists.");
            }

            if (await _context.Users.AnyAsync(u => u.Email == email))
            {
                return Conflict("Email already exists.");
            }

            if (imageFile == null || imageFile.Length == 0)
                return BadRequest("Both image and audio files are required.");

            var imageFileName = GetUniqueFileName(imageFile.FileName);
            var imageFilePath = Path.Combine(_uploadUserProfile, imageFileName);

            using (var imageStream = new FileStream(imageFilePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(imageStream);
            }

            var mediaFile = new TuneSyncUser()
            {
                Name = name,
                UserName = username,
                Email = email,
                Password = password,
                Phone = phone,
                Role = role,
                IsApproved = isApproved,
                IsDeleted = isDeleted,
                ProfileImage = imageFilePath
            };

            _context.Users.Add(mediaFile);
            await _context.SaveChangesAsync();

            return Ok(new { message = $"Registration successful of {username}!" });
        }

        private string GetUniqueFileName(string fileName)
        {
            return Path.GetFileNameWithoutExtension(fileName)
                + "_"
                + Guid.NewGuid().ToString().Substring(0, 8)
                + Path.GetExtension(fileName);
        }

    }
}
