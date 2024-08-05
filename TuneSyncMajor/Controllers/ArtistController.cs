using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TuneSyncMajor.Data;
using TuneSyncMajor.Models;

namespace TuneSyncMajor.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArtistController : ControllerBase
    {
        private readonly RegisterContext _context;
        private readonly string _uploadImageFolder = @"C:\Users\divyeshl\source\repos\TuneSyncMajorProject\Angular\AngularFrontEnd\src\assets\images";
        private readonly string _uploadAudioFolder = @"C:\Users\divyeshl\source\repos\TuneSyncMajorProject\Angular\AngularFrontEnd\src\assets\audio";
        

        public ArtistController(RegisterContext registercontext)
        {
            _context = registercontext;
            EnsureUploadFolderExists();
        }
        private void EnsureUploadFolderExists()
        {
            var uploadsImageFolderPath = Path.Combine(Directory.GetCurrentDirectory(), _uploadImageFolder);
            var uploadsAudioFolderPath = Path.Combine(Directory.GetCurrentDirectory(), _uploadAudioFolder);
            if (!Directory.Exists(uploadsImageFolderPath))
                Directory.CreateDirectory(uploadsImageFolderPath);

            if (!Directory.Exists(uploadsAudioFolderPath))
                Directory.CreateDirectory(uploadsAudioFolderPath);
        }

        [HttpPost("songs/insert")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> InsertSong(IFormFile imageFile, IFormFile audioFile, string category, string songName, string language, int artistId)
        {
            if (imageFile == null || imageFile.Length == 0 || audioFile == null || audioFile.Length == 0)
                return BadRequest("Both image and audio files are required.");

            var imageFileName = GetUniqueFileName(imageFile.FileName);
            var audioFileName = GetUniqueFileName(audioFile.FileName);
            var imageFilePath = Path.Combine(_uploadImageFolder, imageFileName);
            var audioFilePath = Path.Combine(_uploadAudioFolder, audioFileName);

            using (var imageStream = new FileStream(imageFilePath, FileMode.Create))
            using (var audioStream = new FileStream(audioFilePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(imageStream);
                await audioFile.CopyToAsync(audioStream);
            }

            var fileRecord = new Song
            {
                SongName = songName,
                Category = category,
                Language = language,
                ArtistId = artistId,
                IsDeleted = 0,
                LikeCount = 0,
                ImageFilePath = imageFilePath,
                AudioFilePath = audioFilePath
            };

            _context.Songs.Add(fileRecord);
            await _context.SaveChangesAsync();

            return Ok(new { songName, category, language, artistId, imageFileName, audioFileName });
        }

        private string GetUniqueFileName(string fileName)
        {
            // Generate a unique file name while retaining the original file extension
            return Path.GetFileNameWithoutExtension(fileName)
                + "_"
                + Guid.NewGuid().ToString().Substring(0, 8)
                + Path.GetExtension(fileName);
        }



        //[HttpPut("update-song/{id}")]
        //public async Task<IActionResult> UpdateSong(int id, string category, string songName, string language, string artist, IFormFile imageFile, IFormFile audioFile)
        //{
        //    // Check if the image and audio files are provided
        //    if (imageFile == null || imageFile.Length == 0 || audioFile == null || audioFile.Length == 0)
        //    {
        //        return BadRequest("Both image and audio files are required.");
        //    }

        //    // Find the song to update
        //    var existingSong = await _context.Songs.FindAsync(id);
        //    if (existingSong == null)
        //    {
        //        return NotFound("Song not found.");
        //    }

        //    // Update the song properties
        //    existingSong.Category = category;
        //    existingSong.SongName = songName;
        //    existingSong.Language = language;

        //    // Read and update the image file
        //    using (var imageMemoryStream = new MemoryStream())
        //    {
        //        await imageFile.CopyToAsync(imageMemoryStream);
        //        existingSong.ImageData = imageMemoryStream.ToArray();
        //    }

        //    // Read and update the audio file
        //    using (var audioMemoryStream = new MemoryStream())
        //    {
        //        await audioFile.CopyToAsync(audioMemoryStream);
        //        existingSong.AudioData = audioMemoryStream.ToArray();
        //    }

        //    // Save changes to the database
        //    await _context.SaveChangesAsync();

        //    return Ok("Song updated successfully.");
        //}



        [HttpGet("get-songs-by-artist/{artistId}")]
        public IActionResult GetSongsByArtist(int artistId)
        {
            try
            {
                var songs = _context.Songs.Where(s => (s.ArtistId == artistId && s.IsDeleted != 1)).ToList();
                return Ok(songs);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }


        [HttpDelete("delete-song/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var existingSong = await _context.Songs.FindAsync(id);
                if (existingSong == null)
                {
                    return NotFound("Song not found");
                }

                existingSong.IsDeleted = 1;

                await _context.SaveChangesAsync();

                return Ok(new { msg = "Song soft deleted successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }





        //[HttpPut("update-artist-profile/{id}")]
        //public async Task<IActionResult> UpdateArtistProfile(int id, string name, string username, string password, string phone, IFormFile imageFile)
        //{
        //    var existingUser = await _context.Users.FindAsync(id);
        //    if (existingUser == null)
        //    {
        //        return NotFound("User not found");
        //    }

        //    existingUser.Name = name;
        //    existingUser.UserName = username;
        //    existingUser.Password = password;
        //    existingUser.Phone = phone;

        //    // Read and update the image file
        //    if (imageFile != null && imageFile.Length > 0)
        //    {
        //        using (var imageMemoryStream = new MemoryStream())
        //        {
        //            await imageFile.CopyToAsync(imageMemoryStream);
        //            existingUser.ProfileImage = imageMemoryStream.ToArray();
        //        }
        //    }

        //    // Save changes to the database
        //    await _context.SaveChangesAsync();

        //    return Ok("Artist profile updated successfully.");
        //}


        //[HttpPut("update-artist-image-profile/{id}")]
        //public async Task<IActionResult> UpdateImageProfile(int id, IFormFile imageFile)
        //{
        //    var existingUser = await _context.Users.FindAsync(id);
        //    if (existingUser == null)
        //    {
        //        return NotFound("User not found");
        //    }

        //    // Read and update the image file
        //    if (imageFile != null && imageFile.Length > 0)
        //    {
        //        using (var imageMemoryStream = new MemoryStream())
        //        {
        //            await imageFile.CopyToAsync(imageMemoryStream);
        //            existingUser.ProfileImage = imageMemoryStream.ToArray();
        //        }
        //    }

        //    // Save changes to the database
        //    await _context.SaveChangesAsync();

        //    return Ok("Image profile updated successfully.");
        //}


        //this code needs to be checked before running the application
        [HttpGet("get-ratings-by-artist-and-song/{artistId}/{songId}")]
        public IActionResult GetRatingsByArtistAndSong(int artistId, int songId)
        {
            try
            {
                var ratings = _context.Ratings_Reviews
                    .Where(r => r.UserId == artistId && r.SongId == songId)
                    .ToList();

                return Ok(ratings);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
        //--------------------------------


        [HttpGet("rating-of-song/{songId}")]
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

        // GET AVG RATING
        [HttpGet("average-rating/{songId}")]
        public IActionResult GetAverageRatingBySongId(int songId)
        {
            try
            {
                // Find all ratings associated with the provided songId
                var ratings = _context.Ratings_Reviews
                                      .Where(r => r.SongId == songId)
                                      .ToList();

                // Check if any ratings were found
                if (ratings.Count == 0)
                {
                    return Ok(0);
                }

                // Calculate the average rating
                double averageRating = ratings.Average(r => r.Rating);

                return Ok(averageRating);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }


        [HttpPut("updatePassword/{userId}")]
        public IActionResult UpdatePassword(int userId, [FromBody] PasswordUpdateRequest request)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == userId);
            if (user == null)
                return NotFound();

            // Check if old password matches
            if (user.Password != request.OldPassword)
                return BadRequest(new { message = "Old password is incorrect." });
            else
                user.Password = request.NewPassword;
            _context.SaveChanges();
            return Ok(new { message = "Password updated successfully." });
        }

        public class PasswordUpdateRequest
        {
            public string? OldPassword { get; set; }
            public string? NewPassword { get; set; }
        }
    }
}
