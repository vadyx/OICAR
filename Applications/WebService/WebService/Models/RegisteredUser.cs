namespace WebServis.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("RegisteredUser")]
    public partial class RegisteredUser
    {
        [Key]
        public int IDRegisteredUser { get; set; }

        [Required]
        [StringLength(100)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(100)]
        public string LastName { get; set; }

        [Required]
        [StringLength(256)]
        public string Email { get; set; }

        public int LoginCredentialsID { get; set; }

        public decimal Rating { get; set; }

        [Column(TypeName = "date")]
        public DateTime RegistrationDate { get; set; }

        public virtual LoginCredential LoginCredential { get; set; }
    }
}
