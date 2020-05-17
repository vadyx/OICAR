namespace WebServis.Models.Listings
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class VehicleAccessories_Vehicle_Model : DbContext
    {
        public VehicleAccessories_Vehicle_Model()
            : base("name=apiCS")
        {
        }

        public virtual DbSet<VehicleAccessories_Vehicle> VehicleAccessories_Vehicle { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }
}
