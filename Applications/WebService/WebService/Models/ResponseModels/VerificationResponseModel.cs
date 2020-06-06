using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebServis.Models.ViewModels
{
    public class VerificationResponseModel
    {
        public bool? DriverLicenseVerified { get; set; }
        public DateTime DriverLicenseVerificationExpirationDate { get; set; }
        public bool? PersonalIdentificationVerified { get; set; }
        public DateTime PersonalIdentificationVerificationExpirationDate { get; set; }
    }
}