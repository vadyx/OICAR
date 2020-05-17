namespace WebServis.Models.Vehicle
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class DriveTypeModel : DbContext
    {
        public DriveTypeModel()
            : base("name=apiCS")
        {
        }

        public virtual DbSet<DriveType> DriveType { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }
}
