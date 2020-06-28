using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebServis.Models.ViewModels
{
    public class ReservationUserResponseModel
    {
        public int IDUser { get; set; }
        public string FirstName { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public string MobileNumber { get; set; }
        public string ProfileImage { get; set; }
    }
}