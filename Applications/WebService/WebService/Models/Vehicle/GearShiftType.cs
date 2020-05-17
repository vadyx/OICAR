namespace WebServis.Models.Vehicle
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("GearShiftType")]
    public partial class GearShiftType
    {
        [Key]
        public int IDGearShiftType { get; set; }

        [Column("GearShiftType")]
        [StringLength(70)]
        public string GearShiftType1 { get; set; }
    }
}
