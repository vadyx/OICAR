using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using WebServis.Models.Vehicle;

namespace WebServis.Controllers.Vehicle
{
    public class FuelTypesController : ApiController
    {
        private FuelTypeModel db = new FuelTypeModel();

        // GET: api/fuelTypes
        [Route("api/vehicle/fuelTypes")]
        public IQueryable<FuelType> GetFuelType()
        {
            return db.FuelType;
        }
    }
}