namespace WebServis.Models.Listings
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("VehicleImage")]
    public partial class VehicleImage
    {
        [Key]
        public int IDVehicleImage { get; set; }

        [Required]
        public byte[] VehicleImageString { get; set; }

        public int VehicleID { get; set; }
    }
}
