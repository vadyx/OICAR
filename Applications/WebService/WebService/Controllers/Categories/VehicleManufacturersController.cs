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
    public class VehicleManufacturersController : ApiController
    {
        private VehicleManufacturerModel db_manufacturer = new VehicleManufacturerModel();
        private Category_VehicleManufacturerModel db_category_manufacturer = new Category_VehicleManufacturerModel();

        // GET: api/VehicleManufacturers/categoryName
        [Route("api/vehicleManufacturers/{idCategory}")]
        [ResponseType(typeof(VehicleManufacturer))]
        public List<VehicleManufacturer> GetVehicleManufacturer(int idCategory)
        {
            List<VehicleManufacturer> vehicleManufacturers = new List<VehicleManufacturer>();
            foreach (Category_VehicleManufacturer category_VehicleManufacturer in db_category_manufacturer.Category_VehicleManufacturer)
            {
                if (category_VehicleManufacturer.CategoryID == idCategory)
                {
                    vehicleManufacturers.Add(db_manufacturer.VehicleManufacturer.Find(category_VehicleManufacturer.VehicleManufacturerID));
                }
            }

            return vehicleManufacturers;
        }
    }
}