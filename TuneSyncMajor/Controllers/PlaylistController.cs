
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using TuneSyncMajor.Models;
using TuneSyncMajor.Data;


namespace TuneSyncMajor.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlaylistController : ControllerBase
    {
        private readonly RegisterContext _context;
        //public PlaylistController(PlaylistContext context)
        //{
        //    _context = context ?? throw new ArgumentNullException(nameof(context));
        //}
        public PlaylistController(RegisterContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<PlayList>>> GetAllPlaylists()
        {
            try
            {
                var playlists = await _context.PlayLists
                    .OrderByDescending(p => p.Playlist_Id) // Order by primary key in descending order
                    .ToListAsync();

                return Ok(playlists);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<string>>> GetPlaylistSongs(int id)
        {
            try
            {
                var playlist = await _context.PlayLists
                    .Include(p => p.User) // Include the related user
                    .FirstOrDefaultAsync(p => p.Playlist_Id == id);

                if (playlist != null && !string.IsNullOrEmpty(playlist.Songs_in_List))
                {
                    return Ok(playlist);
                }
                else
                {
                    return NotFound("Playlist not found or Songs_in_List is empty.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        [HttpPost]
        public async Task<ActionResult> CreatePlaylist(int UserId, string playlistName, string songIds)
        {
            try
            {
                // Check if playlistName is null or empty
                if (string.IsNullOrEmpty(playlistName))
                {
                    return BadRequest("Playlist name cannot be empty.");
                }

                // Check if songIds is null or empty
                if (songIds == null || songIds == "")
                {
                    return BadRequest("No song IDs provided.");
                }


                // Create a new Playlist object
                var playlist = new PlayList
                {
                    UserId = UserId,
                    Playlist_Name = playlistName,
                    Songs_in_List = songIds
                };

                // Add the playlist to the context
                _context.PlayLists.Add(playlist);

                // Save changes to the database
                await _context.SaveChangesAsync();

                // Return the created playlist
                return CreatedAtAction(nameof(GetPlaylistSongs), new { id = playlist.Playlist_Id }, playlist);
                //return CreatedAtAction(nameof(GetPlaylistSongs), new { playlistId = playlist.Playlist_Id }, playlist);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlaylist(int id)
        {
            try
            {
                // Find the playlist by id
                var playlist = await _context.PlayLists.FindAsync(id);

                if (playlist == null)
                {
                    return NotFound("Playlist not found.");
                }

                // Remove the playlist from the context
                _context.PlayLists.Remove(playlist);

                // Save changes to the database
                await _context.SaveChangesAsync();

                return Ok(new { msg = "Playlist deleted successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePlaylist(int id, [Required] string songIds)
        {
            try
            {
                // Check if songIds is provided
                if (string.IsNullOrEmpty(songIds))
                {
                    return BadRequest("The songIds field is required.");
                }

                // Find the playlist by id
                var playlist = await _context.PlayLists.FindAsync(id);

                if (playlist == null)
                {
                    return NotFound("Playlist not found.");
                }

                // Update the songIds
                playlist.Songs_in_List = songIds;

                // Save changes to the database
                await _context.SaveChangesAsync();

                return Ok(new { msg = "Success" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

    }


}