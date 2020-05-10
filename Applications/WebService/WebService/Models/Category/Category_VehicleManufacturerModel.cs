namespace WebServis.Models.Category
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class Category_VehicleManufacturerModel : DbContext
    {
        public Category_VehicleManufacturerModel()
            : base("name=apiCS")
        {
        }

        public virtual DbSet<Category_VehicleManufacturer> Category_VehicleManufacturer { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }
}
