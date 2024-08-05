using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TuneSyncMajor.Data;
using TuneSyncMajor.Models;

namespace TuneSyncMajor.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly RegisterContext _context;
        private readonly string _uploadUserProfile = @"C:\Users\divyeshl\source\repos\TuneSyncMajorProject\Angular\AngularFrontEnd\src\assets\profileImages";


        public UserController(RegisterContext registercontext)
        {
            _context = registercontext;
        }

        [HttpGet("search-songs")]
        public IActionResult SearchSong(string searchQuery)
        {
            try
            {
                var songs = _context.Songs
                    .Where(s => s.SongName.Contains(searchQuery) ||
                                s.Category.Contains(searchQuery) ||
                                s.Language.Contains(searchQuery))
                    .ToList();

                return Ok(songs);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }


        [HttpGet("getall-Songs")]
        public IActionResult GetAllSongs()
        {
            try
            {
                var songs = _context.Songs.ToList();
                return Ok(songs);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }



        [HttpGet("get-songs-by-artist/{artistId}")]
        public IActionResult GetSongsByArtist(int artistId)
        {
            try
            {
                var songs = _context.Songs.Where(s => s.ArtistId == artistId).ToList();
                return Ok(songs);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }


        [HttpGet("getSongs/{id}")]
        public IActionResult GetSongById(int id)
        {
            try
            {
                var song = _context.Songs.Find(id);
                if (song == null)
                {
                    return NotFound("Song not found");
                }
                return Ok(song);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpGet("get-songs-by-category/{category}")]
        public IActionResult GetSongsByCategory(string category)
        {
            try
            {
                var songs = _context.Songs.Where(s => s.Category == category).ToList();
                return Ok(songs);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }


        // POST: api/Ratings
        [HttpPost("add-ratings")]
        public IActionResult PostRating(Ratings_Reviews rating)
        {
            try
            {
                // Check if the provided User ID exists
                var userExists = _context.Users.Any(u => u.Id == rating.UserId);
                if (!userExists)
                {
                    return BadRequest("User with the provided ID does not exist.");
                }

                // Check if the provided Song ID exists
                var songExists = _context.Songs.Any(s => s.Id == rating.SongId);
                if (!songExists)
                {
                    return BadRequest("Song with the provided ID does not exist.");
                }

                var existingRating = _context.Ratings_Reviews.FirstOrDefault(r => r.UserId == rating.UserId && r.SongId == rating.SongId);
                if (existingRating != null)
                {
                    return Ok(new { msg = "User has already rated this song." });
                    //return BadRequest("User has already rated this song.");
                }

                if (rating.Rating < 1 || rating.Rating > 5)
                {
                    return BadRequest("Rating score must be between 1 and 5.");
                }

                _context.Ratings_Reviews.Add(rating);
                _context.SaveChanges();

                return Ok(new { msg = "Rating added successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
        // GET: api/Ratings
        [HttpGet("get-all-ratings")]
        public IActionResult GetRatings()
        {
            try
            {
                var ratings = _context.Ratings_Reviews.ToList();
                return Ok(ratings);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        // GET: api/Ratings/{id}
        [HttpGet("get-ratings/{id}")]
        public IActionResult GetRatingById(int id)
        {
            try
            {
                var rating = _context.Ratings_Reviews.Find(id);

                if (rating == null)
                {
                    return NotFound("Rating not found.");
                }

                return Ok(rating);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        // GET: api/Ratings/song/{songId}
        [HttpGet("get-rating-of-a-song/{songId}")]
        public IActionResult GetRatingsBySongId(int songId)
        {
            try
            {
                // Find all ratings and reviews associated with the provided songId
                var ratings = _context.Ratings_Reviews
                                      .Where(r => r.SongId == songId)
                                      .ToList();

                // Check if any ratings were found
                if (ratings.Count == 0)
                {
                    return NotFound("No ratings found for the provided song ID.");
                }

                return Ok(ratings);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }


        [HttpPost("AddToFav")]
        public IActionResult AddToFavorites(AddToFav addToFav)
        {
            try
            {
                // Check if the user ID and song ID exist
                var userExists = _context.Users.Any(u => u.Id == addToFav.UserId);
                var songExists = _context.Songs.Any(s => s.Id == addToFav.SongId);

                if (!userExists)
                {
                    return NotFound("User not found.");
                }

                if (!songExists)
                {
                    return NotFound("Song not found.");
                }

                // Add the song to favorites
                _context.AddToFavs.Add(addToFav);
                _context.SaveChanges();

                var song = _context.Songs.FirstOrDefault(s => s.Id == addToFav.SongId);
                if (song != null)
                {
                    song.LikeCount++;
                }

                _context.SaveChanges();

                return Ok(new {msg = "Song added to favorites successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpGet("FavList/{userId}")]
        public IActionResult GetFavorites(int userId)
        {
            try
            {
                
                var favorites = _context.AddToFavs
                    .Where(a => a.UserId == userId)
                    .Select(a => new
                    {
                        Id = a.Id,
                        UserId = a.UserId,
                        Song = _context.Songs.FirstOrDefault(s => s.Id == a.SongId)
                    })
                    .ToList();

                return Ok(favorites);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpDelete("RemoveFromFav/{userId}/{songId}")]
        public IActionResult RemoveFromFavorites(int userId, int songId)
        {
            try
            {
                // Find the favorite entry for the specified user ID and song ID
                var favorite = _context.AddToFavs.FirstOrDefault(a => a.UserId == userId && a.SongId == songId);

                if (favorite == null)
                {
                    return NotFound("Favorite not found.");
                }

                // Remove the favorite from the database
                _context.AddToFavs.Remove(favorite);
                _context.SaveChanges();

                var song = _context.Songs.FirstOrDefault(s => s.Id == songId);
                if (song != null && song.LikeCount > 0)
                {
                    song.LikeCount--;
                }

                _context.SaveChanges();

                return Ok(new { msg = "Song removed from favorites successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpGet("IsSongLiked")]
        public IActionResult IsSongLiked(int userId, int songId)
        {
            // Check if the song is already liked by the user
            var isLiked = _context.AddToFavs.Any(f => f.UserId == userId && f.SongId == songId);
            return Ok(isLiked);
        }
        private void EnsureUploadFolderExists()
        {

            var uploadsProfileFolderPath = Path.Combine(Directory.GetCurrentDirectory(), _uploadUserProfile);

            if (!Directory.Exists(uploadsProfileFolderPath))
                Directory.CreateDirectory(uploadsProfileFolderPath);
        }

        [HttpPut("update-profile/{id}")]
        public async Task<IActionResult> UpdateArtistProfile(int id, string name, string phone, IFormFile imageFile)
        {
            var existingUser = await _context.Users.FindAsync(id);
            if (existingUser == null)
            {
                return NotFound("User not found");
            }
            if (imageFile != null)
            {
                var imageFileName = GetUniqueFileName(imageFile.FileName);
                var imageFilePath = Path.Combine(_uploadUserProfile, imageFileName);
                using (var imageStream = new FileStream(imageFilePath, FileMode.Create))
                {
                    await imageFile.CopyToAsync(imageStream);
                }

                existingUser.ProfileImage = imageFilePath;
            }
            else
            {
                existingUser.ProfileImage = existingUser.ProfileImage;
            }


            // Update only the provided fields
            if (!string.IsNullOrEmpty(name))
            {
                existingUser.Name = name;
            }
            if (!string.IsNullOrEmpty(phone))
            {
                existingUser.Phone = phone;
            }

            // Save changes to the database
            await _context.SaveChangesAsync();

            return Ok(new { msg = "Artist profile updated successfully." });
        }

        [HttpGet("toprated")]
        public async Task<ActionResult<IEnumerable<Song>>> GetTopRatedSongs()
        {
            var topRatedSongs = await _context.Ratings_Reviews
                .GroupBy(ur => ur.SongId)
                .Select(g => new
                {
                    SongId = g.Key,
                    AverageRating = g.Average(ur => ur.Rating)
                })
                .OrderByDescending(x => x.AverageRating)
                .Take(4)
                .ToListAsync();

            var songs = new List<Song>();

            foreach (var songInfo in topRatedSongs)
            {
                var song = await _context.Songs.FindAsync(songInfo.SongId);
                if (song != null)
                {
                    songs.Add(song);
                }
            }

            return Ok(songs);
        }


        [HttpGet("topliked")]
        public async Task<ActionResult<IEnumerable<Song>>> GetTopLikedSongs()
        {
            var topLikedSongs = await _context.Songs
                .Where(s => s.IsDeleted == 0) // Filter out deleted songs
                .OrderByDescending(s => s.LikeCount)
                .Take(4)
                .ToListAsync();

            return Ok(topLikedSongs);
        }


        [HttpGet("category/{songCategory}")]
        public IActionResult GetAllSongsByCategory(string songCategory)
        {
            try
            {
                var songNames = _context.Songs
                    .Where(s => s.Category == songCategory)
                    .Select(s => s.SongName)
                    .ToList();

                return Ok(songNames);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpGet("categories")]
        public IActionResult GetCategories()
        {
            try
            {
                var categories = _context.Songs
                    .Select(s => s.Category)
                    .Distinct()
                    .ToList();

                return Ok(categories);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
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
