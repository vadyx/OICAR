namespace WebServis.Models.Vehicle
{
    using Newtonsoft.Json;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("SubCategory")]
    public partial class SubCategory
    {
        [Key]
        public int IDSubCategory { get; set; }

        [Column("SubCategory")]
        [StringLength(70)]
        public string SubCategory1 { get; set; }

        [JsonIgnore]
        public int CategoryID { get; set; }
    }
}
