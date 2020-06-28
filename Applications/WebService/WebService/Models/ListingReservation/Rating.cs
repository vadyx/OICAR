namespace WebServis.Models.ListingReservation
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Rating")]
    public partial class Rating
    {
        [Key]
        public int IDRating { get; set; }

        public int UserRaterID { get; set; }

        public int RatedUserID { get; set; }

        [Column("Rating")]
        public double RatingValue { get; set; }
    }
}
