namespace WebServis.Models.Vehicle
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("DriveType")]
    public partial class DriveType
    {
        [Key]
        public int IDDriveType { get; set; }

        [Column("DriveType")]
        [StringLength(70)]
        public string DriveType1 { get; set; }
    }
}
