using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebServis.Models.ResponseModels
{
    public class ListingUserResponseModel
    {
        public int IDUser { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public decimal Rating { get; set; }
        public DateTime RegistrationDate { get; set; }
        public byte[] ProfileImage { get; set; }
    }
}