namespace WebServis.Models.Vehicle
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class FuelTypeModel : DbContext
    {
        public FuelTypeModel()
            : base("name=apiCS")
        {
        }

        public virtual DbSet<FuelType> FuelType { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }
}
