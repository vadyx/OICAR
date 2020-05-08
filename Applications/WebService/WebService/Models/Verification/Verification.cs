namespace WebServis.Models.Verification
{
    using Newtonsoft.Json;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;
    using WebServis.Models.Registration;

    [Table("Verification")]
    public partial class Verification
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Verification()
        {
            RegisteredUser = new HashSet<RegisteredUser>();
        }

        [Key]
        public int IDVerification { get; set; }

        public byte[] DriverLicense { get; set; }

        public bool? DriverLicenseVerified { get; set; }

        [Column(TypeName = "date")]
        public DateTime DriverLicenseVerificationExpirationDate { get; set; }

        public byte[] PersonalIdentification { get; set; }

        public bool? PersonalIdentificationVerified { get; set; }

        [Column(TypeName = "date")]
        public DateTime PersonalIdentificationVerificationExpirationDate { get; set; }

        [JsonIgnore]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<RegisteredUser> RegisteredUser { get; set; }
    }
}
