namespace WebServis.Models.Listings
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("PriceBy")]
    public partial class PriceBy
    {
        [Key]
        public int IDPriceBy { get; set; }

        [Column("PriceBy")]
        [StringLength(70)]
        public string PriceBy1 { get; set; }
    }
}
