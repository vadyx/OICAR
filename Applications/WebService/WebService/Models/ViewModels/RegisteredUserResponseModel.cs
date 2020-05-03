using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebServis.Models.ViewModels
{
    public class RegisteredUserResponseModel
    {
        public int IDRegisteredUser { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public decimal Rating { get; set; }
        public DateTime RegistrationDate { get; set; }
        public byte[] ProfileImage { get; set; }
        public virtual VerificationResponseModel Verification { get; set; }
    }
}