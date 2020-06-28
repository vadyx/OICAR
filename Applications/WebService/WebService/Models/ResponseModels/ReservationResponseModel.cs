using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebServis.Models.ViewModels
{
    public class ReservationResponseModel
    {
        public string Image { get; set; }

        public string Title { get; set; }

        public string VehicleManufacturer { get; set; }
        public string VehicleModel { get; set; }
        public int ReservationNumber { get; set; }
        public double Price { get; set; }
        public double? Rating { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
        public decimal? LocationX { get; set; }
        public decimal? LocationY { get; set; }
        public ReservationUserResponseModel UserInfo { get; set; }
    }
}