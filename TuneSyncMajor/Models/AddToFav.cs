using System.ComponentModel.DataAnnotations;

namespace TuneSyncMajor.Models
{
    public class AddToFav
    {
        [Key]
        public int Id { get; set; }

        public int UserId { get; set; }

        public int SongId { get; set; }
    }
}
