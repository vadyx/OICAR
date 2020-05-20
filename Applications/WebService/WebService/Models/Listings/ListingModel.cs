namespace WebServis.Models.Listings
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class ListingModel : DbContext
    {
        public ListingModel()
            : base("name=apiCS")
        {
        }

        public virtual DbSet<Listing> Listing { get; set; }
        public virtual DbSet<Vehicle> Vehicle { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Listing>()
                .Property(e => e.LocationCoordinateX)
                .HasPrecision(9, 6);

            modelBuilder.Entity<Listing>()
                .Property(e => e.LocationCoordinateY)
                .HasPrecision(9, 6);

            modelBuilder.Entity<Vehicle>()
                .HasMany(e => e.Listing)
                .WithRequired(e => e.Vehicle)
                .HasForeignKey(e => e.VehicleID)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Vehicle>().Ignore(v => v.SubCategoryID);
            modelBuilder.Entity<Vehicle>().Ignore(v => v.Accessories);
            modelBuilder.Entity<Listing>().Ignore(l => l.Images);
        }
    }
}
