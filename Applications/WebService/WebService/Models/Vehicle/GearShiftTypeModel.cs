namespace WebServis.Models.Vehicle
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class GearShiftTypeModel : DbContext
    {
        public GearShiftTypeModel()
            : base("name=apiCS")
        {
        }

        public virtual DbSet<GearShiftType> GearShiftType { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }
}
