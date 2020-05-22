namespace WebServis.Models.Listings
{
    using Newtonsoft.Json;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Vehicle")]
    public partial class Vehicle
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Vehicle()
        {
            Listing = new HashSet<Listing>();
        }

        [Key]
        public int IDVehicle { get; set; }

        public int CategoryID { get; set; }

        public int VehicleManufacturerID { get; set; }

        public int? VehicleModelID { get; set; }

        public int? SubCategoryID { get; set; }

        public int? ManufacturingYear { get; set; }

        public int? FuelTypeID { get; set; }

        public int? DriveTypeID { get; set; }

        public int? GearShiftTypeID { get; set; }

        public double? Kilometers { get; set; }

        public double? EnginePower { get; set; }

        public int[] Accessories { get; set; }

        [JsonIgnore]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Listing> Listing { get; set; }
    }
}
