using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebServis.Models.ResponseModels;

namespace WebServis.Models.ViewModels
{
    public class ListingResponseModel
    {
        public int IDListing { get; set; }

        public string Title { get; set; }

        public string ListingDescription { get; set; }

        public double Price { get; set; }

        public string PriceBy { get; set; }

        public DateTime AvailableFromDate { get; set; }

        public DateTime AvailableToDate { get; set; }

        public decimal? LocationCoordinateX { get; set; }

        public decimal? LocationCoordinateY { get; set; }

        public string[] Images { get; set; }

        public VehicleResponseModel Vehicle { get; set; }

        public ListingUserResponseModel User { get; set; }
    }
}