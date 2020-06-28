namespace WebServis.Models.ListingReservation
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class RatingModel : DbContext
    {
        public RatingModel()
            : base("name=apiCS")
        {
        }

        public virtual DbSet<Rating> Rating { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }
}
