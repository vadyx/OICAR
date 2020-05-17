namespace WebServis.Models.Vehicle
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class VehicleAccessoriesModel : DbContext
    {
        public VehicleAccessoriesModel()
            : base("name=apiCS")
        {
        }

        public virtual DbSet<VehicleAccessories> VehicleAccessories { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }
}
