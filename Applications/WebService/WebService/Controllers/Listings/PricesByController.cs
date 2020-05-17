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
using WebServis.Models.Listings;

namespace WebServis.Controllers.Listings
{
    public class PricesByController : ApiController
    {
        private PriceByModel db = new PriceByModel();

        [Route("api/listing/priceBy")]
        public IQueryable<PriceBy> GetPriceBy()
        {
            return db.PriceBy;
        }
    }
}