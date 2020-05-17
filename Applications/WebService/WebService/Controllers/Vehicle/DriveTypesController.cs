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
    public class DriveTypesController : ApiController
    {
        private DriveTypeModel db = new DriveTypeModel();

        [Route("api/vehicle/driveTypes")]
        public IQueryable<DriveType> GetDriveType()
        {
            return db.DriveType;
        }
    }
}