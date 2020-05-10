namespace WebServis.Models.Category
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("VehicleManufacturer")]
    public partial class VehicleManufacturer
    {
        [Key]
        public int IDVehicleManufacturer { get; set; }

        [Required]
        [StringLength(50)]
        public string ManufacturerName { get; set; }
    }
}
