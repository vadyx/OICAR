using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebServis.Models.ViewModels
{
    public class ListingResponseModel
    {
        public int IDListing { get; set; }

        public string Title { get; set; }

        public string ListingDescription { get; set; }

        public double Price { get; set; }

        public string PriceBy { get; set; }

        public decimal Rating { get; set; }

        public string Image { get; set; }

        public string VehicleManufacturer{ get; set; }

        public string VehicleModel { get; set; }
    }
}