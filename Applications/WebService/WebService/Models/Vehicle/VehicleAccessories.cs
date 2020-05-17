namespace WebServis.Models.Vehicle
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class VehicleAccessories
    {
        [Key]
        public int IDVehicleAccessories { get; set; }

        [Column("VehicleAccessories")]
        [StringLength(70)]
        public string VehicleAccessories1 { get; set; }
    }
}
