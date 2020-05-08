namespace WebServis.Models.Category
{
    using Newtonsoft.Json;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Category")]
    public partial class Category
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Category()
        {
            VehicleManufacturer = new HashSet<VehicleManufacturer>();
        }

        [Key]
        [JsonIgnore]
        public int IDCategory { get; set; }

        [Required]
        [StringLength(60)]
        public string CategoryName { get; set; }

        [Required]
        public byte[] CategoryImage { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<VehicleManufacturer> VehicleManufacturer { get; set; }
    }
}
