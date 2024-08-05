using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Linq.Expressions;
using System.Security.Claims;
using System.Text;
using TuneSyncMajor.Data;
using TuneSyncMajor.Models;

namespace TuneSyncMajor.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly RegisterContext _registerContext;
        private readonly IConfiguration _config;

        public LoginController(IConfiguration config ,RegisterContext registercontext)
        {
            _config = config;
            _registerContext = registercontext;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginUser loginUser)
        {
            // Basic input validation
            if (string.IsNullOrEmpty(loginUser.UserEmail) || string.IsNullOrEmpty(loginUser.Password))
            {
                return BadRequest("Email and password are required.");
            }

            // Find user by username
            var user = await _registerContext.Users.FirstOrDefaultAsync(u => u.Email == loginUser.UserEmail);

            // Check if user exists
            if (user == null)
            {
                return NotFound("User not found.");
            }

            // Verify password (assuming password is stored as plain text)
            if (user.Password != loginUser.Password)
            {
                return Unauthorized("Invalid password.");
            }

            // Return success response
            var token = GenerateToken(loginUser, user);
            return Ok(new { token, user });
        }

        private string GenerateToken(LoginUser userLogin, TuneSyncUser user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
                    {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                //new Claim(ClaimTypes.Actor, userLogin.UserEmail),
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Gender, user.ProfileImage),
                new Claim(ClaimTypes.Actor, Convert.ToString(user.Role))
                
            };

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                _config["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(15),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
