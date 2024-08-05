using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace TuneSyncMajor.Models
{
    public class PlayList
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Playlist_Id { get; set; }
        public string? Playlist_Name { get; set; }
        public string? Songs_in_List { get; set; }

        // Foreign key property
        public int UserId { get; set; }

        // Navigation property
        [ForeignKey("UserId")]
        public TuneSyncUser? User { get; set; }
    }
}
