namespace WebServis.Models.Listings
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class VehicleImageModel : DbContext
    {
        public VehicleImageModel()
            : base("name=apiCS")
        {
        }

        public virtual DbSet<VehicleImage> VehicleImage { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }
}
