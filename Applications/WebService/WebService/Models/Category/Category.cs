namespace WebServis.Models.Category
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Category")]
    public partial class Category
    {
        [Key]
        public int IDCategory { get; set; }

        [Required]
        [StringLength(60)]
        public string CategoryName { get; set; }

        [Required]
        public byte[] CategoryImage { get; set; }
    }
}
