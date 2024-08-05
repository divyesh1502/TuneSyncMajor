using System.ComponentModel.DataAnnotations;

namespace TuneSyncMajor.Models
{
    public class Ratings_Reviews
    {
        public int Id { get; set; }

        public int UserId { get; set; } // User ID

        public int SongId { get; set; } // Song ID

        [Range(1, 5, ErrorMessage = "The rating must be between 1 and 5.")]
        public int Rating { get; set; } // Rating score (on a scale of 1 to 5)

        public string? Review_title { get; set; }

        public string? Review_desc {  get; set; }
    }
}
