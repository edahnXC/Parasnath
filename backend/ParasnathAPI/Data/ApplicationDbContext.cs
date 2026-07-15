using Microsoft.EntityFrameworkCore;
using ParasnathAPI.Models;
using System;
using System.Linq;

namespace ParasnathAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Temple> Temples => Set<Temple>();
        public DbSet<TrekkingRoute> TrekkingRoutes => Set<TrekkingRoute>();
        public DbSet<Waypoint> Waypoints => Set<Waypoint>();
        public DbSet<GalleryImage> GalleryImages => Set<GalleryImage>();
        public DbSet<EcoItem> EcoItems => Set<EcoItem>();
        public DbSet<SiteSetting> SiteSettings => Set<SiteSetting>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // SQLite value converters for string lists
            modelBuilder.Entity<Temple>()
                .Property(t => t.Images)
                .HasConversion(
                    v => string.Join(',', v),
                    v => v.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList()
                );

            modelBuilder.Entity<Waypoint>()
                .Property(w => w.Images)
                .HasConversion(
                    v => string.Join(',', v),
                    v => v.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList()
                );
        }
    }
}
