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
using System.Web.Routing;
using WebServis.Models.ListingReservation;

namespace WebServis.Controllers.ListingReservationNamespace
{
    public class ListingReservationsController : ApiController
    {
        private ListingReservationModel db = new ListingReservationModel();

        // GET: api/ListingReservations
        [Route("api/reservations")]
        public IQueryable<ListingReservation> GetListingReservation()
        {
            return db.ListingReservation;
        }

        [Route("api/myReservations/{userID}")]
        public IQueryable<ListingReservation> GetReservationForUser(int userID)
        {
            return db.ListingReservation.Where(lr => lr.ReservatorID == userID);
        }

        [Route("api/myListingsReserved/{userID}")]
        public IQueryable<ListingReservation> GetListingReservedForUser(int userID)
        {
            return db.ListingReservation.Where(lr => lr.ListingOwnerID == userID);
        }

        // GET: api/ListingReservations/5
        //[ResponseType(typeof(ListingReservation))]
        //public async Task<IHttpActionResult> GetListingReservation(int id)
        //{
        //    ListingReservation listingReservation = await db.ListingReservation.FindAsync(id);
        //    if (listingReservation == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(listingReservation);
        //}


        // POST: api/ListingReservations
        [Route("api/reserveListing")]
        [ResponseType(typeof(ListingReservation))]
        public async Task<IHttpActionResult> PostListingReservation(ListingReservation listingReservation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                db.ListingReservation.Add(listingReservation);
                await db.SaveChangesAsync();
            }
            catch (Exception)
            {
                return BadRequest();
            }


            return Ok("Success");
        }
    }
}