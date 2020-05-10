namespace WebServis.Models.Category
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class VehicleManufacturerModel : DbContext
    {
        public VehicleManufacturerModel()
            : base("name=apiCS")
        {
        }

        public virtual DbSet<VehicleManufacturer> VehicleManufacturer { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }
}
