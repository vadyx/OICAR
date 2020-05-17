namespace WebServis.Models.Listings
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class PriceByModel : DbContext
    {
        public PriceByModel()
            : base("name=apiCS")
        {
        }

        public virtual DbSet<PriceBy> PriceBy { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }
}
