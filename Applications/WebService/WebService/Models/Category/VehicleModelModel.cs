namespace WebServis.Models.Category
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class VehicleModelModel : DbContext
    {
        public VehicleModelModel()
            : base("name=apiCS")
        {
        }

        public virtual DbSet<VehicleModel> VehicleModel { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }
}
