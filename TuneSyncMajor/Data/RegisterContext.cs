using Microsoft.EntityFrameworkCore;
using TuneSyncMajor.Models;


namespace TuneSyncMajor.Data
{
    public class RegisterContext:DbContext
    {
        public RegisterContext() { }
        public RegisterContext(DbContextOptions<RegisterContext> options) : base(options) { }
        public DbSet<TuneSyncUser> Users { get; set; }
        public DbSet<AddToFav> UserFavorites { get; set; }
        public DbSet<Song> Songs { get; set; }
        public DbSet<AddToFav> AddToFavs { get; set; }
        public DbSet<Ratings_Reviews> Ratings_Reviews { get; set; }

        public DbSet<PlayList> PlayLists { get; set; }   
    }
}
