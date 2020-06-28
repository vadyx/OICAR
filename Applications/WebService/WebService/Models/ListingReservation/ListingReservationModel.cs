namespace WebServis.Models.ListingReservation
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class ListingReservationModel : DbContext
    {
        public ListingReservationModel()
            : base("name=apiCS")
        {
        }

        public virtual DbSet<ListingReservation> ListingReservation { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }
}
