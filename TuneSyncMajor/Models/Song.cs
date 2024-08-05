using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TuneSyncMajor.Models
{
    public class Song
    {
        public int Id { get; set; }
        public string Category { get; set; }
        public string SongName { get; set; }
        public string Language { get; set; }
        public int ArtistId { get; set; }
        public int IsDeleted { get; set; }
        public int LikeCount { get; set; }

        [Required]
        public string? ImageFilePath { get; set; }
        [Required]
        public string? AudioFilePath { get; set; }

    }
}
