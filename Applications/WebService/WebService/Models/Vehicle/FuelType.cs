namespace WebServis.Models.Vehicle
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("FuelType")]
    public partial class FuelType
    {
        [Key]
        public int IDFuelType { get; set; }

        [Column("FuelType")]
        [StringLength(70)]
        public string FuelType1 { get; set; }
    }
}
