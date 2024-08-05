using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace TuneSyncMajor.Models
{
    public class Favorites
    {
        [Key]
        public int AddToFavoritesId { get; set; }
        [ForeignKey("Id")]
        public TuneSyncUser? User { get; set; }
        public int UserId { get; set; }

        [ForeignKey("SongId")]
        public Song? Songs { get; set; }
        public int SongId { get; set; }

        public string Title { get; set; } = string.Empty;
    }
}
