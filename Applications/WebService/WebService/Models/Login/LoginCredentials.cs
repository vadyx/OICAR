namespace WebServis.Models.Login
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class LoginCredentials
    {
        [Key]
        public int IDLoginCredentials { get; set; }

        [Required]
        [StringLength(64)]
        public string Username { get; set; }

        [Required]
        [StringLength(64)]
        public string Pwd { get; set; }
    }
}
