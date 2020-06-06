using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebServis.Models.ResponseModels
{
    public class VehicleResponseModel
    {
        public string Category { get; set; }

        public string VehicleManufacturer { get; set; }

        public string VehicleModel { get; set; }

        public string SubCategory { get; set; }

        public int? ManufacturingYear { get; set; }

        public string FuelType { get; set; }

        public string DriveType { get; set; }

        public string GearShiftType { get; set; }

        public double? Kilometers { get; set; }

        public double? EnginePower { get; set; }

        public string[] Accessories { get; set; }
    }
}