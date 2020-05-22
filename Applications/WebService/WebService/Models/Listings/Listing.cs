namespace WebServis.Models.Listings
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;
    using System.Runtime.InteropServices;
    using System.Runtime.Serialization;

    [Table("Listing")]
    public partial class Listing
    {
        [Key]
        public int IDListing { get; set; }

        public string Title { get; set; }

        public string ListingDescription { get; set; }

        public int VehicleID { get; set; }

        public double Price { get; set; }

        public int PriceByID { get; set; }

        [Column(TypeName = "date")]
        public DateTime AvailableFromDate { get; set; }

        [Column(TypeName = "date")]
        public DateTime AvailableToDate { get; set; }

        public decimal? LocationCoordinateX { get; set; }

        public decimal? LocationCoordinateY { get; set; }

        public int UserID { get; set; }

        public string[] Images { get; set; }

        public virtual Vehicle Vehicle { get; set; }
    }
}
