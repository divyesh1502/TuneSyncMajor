namespace TuneSyncMajor.Models
{
    public enum UserRole
    {
        Admin,
        User,
        Artist
    }
    public class TuneSyncUser
    {
        public ICollection<AddToFav>? AddToFavs { get; set; }
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? UserName { get; set; }
        public string? Phone { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public int Role { get; set; }
        public int IsDeleted { get; set; }
        public string? ProfileImage { get; set; }
        public int IsApproved { get; set; }

    }
}
