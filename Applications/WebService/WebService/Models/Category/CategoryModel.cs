namespace WebServis.Models.Category
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class CategoryModel : DbContext
    {
        public CategoryModel()
            : base("name=apiCS")
        {
        }

        public virtual DbSet<Category> Category { get; set; }
        public virtual DbSet<VehicleManufacturer> VehicleManufacturer { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>()
                .HasMany(e => e.VehicleManufacturer)
                .WithMany(e => e.Category)
                .Map(m => m.ToTable("Category_VehicleManufacturer").MapLeftKey("CategoryID").MapRightKey("VehicleManufacturerID"));

            modelBuilder.Entity<VehicleManufacturer>()
                .HasMany(e => e.VehicleModel)
                .WithRequired(e => e.VehicleManufacturer)
                .HasForeignKey(e => e.VehicleManufacturerID)
                .WillCascadeOnDelete(false);
        }
    }
}
