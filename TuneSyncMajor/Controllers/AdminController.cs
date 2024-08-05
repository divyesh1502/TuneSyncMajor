using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TuneSyncMajor.Data;

namespace TuneSyncMajor.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly RegisterContext _context;

        public AdminController(RegisterContext registercontext)
        {
            _context = registercontext;
        }

        [HttpDelete("delete-artist-profile/{id}")]
        public IActionResult DeleteUser(int id)
        {
            try
            {
                var user = _context.Users.Find(id);
                if (user == null)
                {
                    return NotFound("User not found");
                }

                user.IsDeleted = 1;
                _context.SaveChanges();

                return Ok(new { msg= "User deleted successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }


        [HttpGet("users/getall")]
        public IActionResult GetAllUsers()
        {
            try
            {
                var users = _context.Users.Where(u => u.Role == 1 && u.IsDeleted == 0).ToList();
                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }


        [HttpGet("users/get/{id}")]
        public IActionResult GetUserById(int id)
        {
            try
            {
                var user = _context.Users.FirstOrDefault(u => u.Id == id && u.Role == 1 && u.IsDeleted == 0);
                if (user == null)
                {
                    return NotFound("User not found");
                }
                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }


        [HttpGet("artists/getall")]
        public IActionResult GetAllArtists()
        {
            try
            {
                var artists = _context.Users.Where(u => u.Role == 2 && u.IsDeleted == 0).ToList();
                return Ok(artists);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpGet("artists/get/{id}")]
        public IActionResult GetArtistById(int id)
        {
            try
            {
                var artist = _context.Users.FirstOrDefault(u => u.Id == id && u.Role == 2 && u.IsDeleted == 0);
                if (artist == null)
                {
                    return NotFound("Artist not found");
                }
                return Ok(artist);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpPut("updateUserApproval/{userId}/{approvalStatus}")]
        public IActionResult UpdateUserApproval(int userId, int approvalStatus)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == userId && u.IsDeleted == 0);

            if (user == null)
            {
                return NotFound(new { msg = "User with ID {userId} not found." });
            }

            if (approvalStatus < 0 || approvalStatus > 2)
            {
                return BadRequest(new { msg = "Invalid approval status. Expected values: 0 (pending), 1 (approved), 2 (rejected)." });
            }

            user.IsApproved = approvalStatus;
            _context.SaveChanges();

            return Ok(new { msg = $"User with ID {userId} approval status updated to {approvalStatus} successfully." });
        }

        [HttpGet("deletedusers")]
        public IActionResult GetDeletedUsers()
        {
            var deletedUsers = _context.Users.Where(u => u.IsDeleted == 1).ToList();
            return Ok(deletedUsers);
        }


        [HttpGet("get-all-songs-length")]
        public IActionResult GetSongTableLength()
        {
            try
            {
                int songTableLength = _context.Songs.Count();
                return Ok(songTableLength);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        [HttpGet("GetUserCount")]
        public async Task<IActionResult> GetUserCount()
        {
            var userCount = await _context.Users.Where(u => u.Role == 1 && u.IsDeleted == 0).CountAsync();
            return Ok(userCount);
        }

        [HttpGet("GetArtistCount")]
        public async Task<IActionResult> GetArtistCount()
        {
            var artistCount = await _context.Users.Where(u => u.Role == 2 && u.IsDeleted == 0 && (u.IsApproved == 0 || u.IsApproved == 1)).CountAsync();
            return Ok(artistCount);
        }


        [HttpGet]
        [Route("GetPendingUsers")]
        public IActionResult GetPendingUsers()
        {
            var pendingUsers = _context.Users.Where(u => u.IsApproved == 0 && u.IsDeleted == 0).ToList();
            return Ok(pendingUsers);
        }

    }
}
