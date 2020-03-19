namespace WebServis.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class LoginCredential
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public LoginCredential()
        {
            RegisteredUsers = new HashSet<RegisteredUser>();
        }

        [Key]
        public int IDLoginCredentials { get; set; }

        [Required]
        [StringLength(64)]
        public string Username { get; set; }

        [Required]
        [StringLength(64)]
        public string Pwd { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<RegisteredUser> RegisteredUsers { get; set; }
    }
}
