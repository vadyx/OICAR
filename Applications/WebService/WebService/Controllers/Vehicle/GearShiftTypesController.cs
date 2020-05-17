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
    public class GearShiftTypesController : ApiController
    {
        private GearShiftTypeModel db = new GearShiftTypeModel();

        [Route("api/vehicle/gearShiftTypes")]
        public IQueryable<GearShiftType> GetGearShiftType()
        {
            return db.GearShiftType;
        }
    }
}