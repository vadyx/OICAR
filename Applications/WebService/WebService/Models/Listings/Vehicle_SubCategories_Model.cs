namespace WebServis.Models.Listings
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class Vehicle_SubCategories_Model : DbContext
    {
        public Vehicle_SubCategories_Model()
            : base("name=apiCS")
        {
        }

        public virtual DbSet<Vehicle_SubCategories> Vehicle_SubCategories { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }
}
