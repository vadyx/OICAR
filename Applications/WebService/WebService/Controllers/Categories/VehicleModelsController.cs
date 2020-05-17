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
using WebServis.Models.Category;

namespace WebServis.Controllers.Categories
{
    public class VehicleModelsController : ApiController
    {
        private VehicleModelModel db = new VehicleModelModel();

        // GET: api/VehicleModels/5
        [ResponseType(typeof(VehicleModel))]
        [Route("api/vehicleModels/{id}")]
        public IQueryable<VehicleModel> GetVehicleModel(int id)
        {
            return db.VehicleModel.Where(vehicleModel => vehicleModel.VehicleManufacturerID == id);
        }
    }
}