namespace WebServis.Models.ListingReservation
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ListingReservation")]
    public partial class ListingReservation
    {
        [Key]
        public int IDListingReservation { get; set; }

        [Column(TypeName = "date")]
        public DateTime FromDate { get; set; }

        [Column(TypeName = "date")]
        public DateTime ToDate { get; set; }

        [Required]
        [StringLength(20)]
        public string MobileNumber { get; set; }

        public double Price { get; set; }

        public int CardNumber { get; set; }

        public double? Rating { get; set; }

        public int ReservatorID { get; set; }

        public int ListingOwnerID { get; set; }

        public int ListingID { get; set; }
    }
}
