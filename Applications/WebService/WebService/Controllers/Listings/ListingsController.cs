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
    public class ListingsController : ApiController
    {
        private ListingModel db = new ListingModel();
        private VehicleAccessories_Vehicle_Model db_vehicleAccesories_vehicle = new VehicleAccessories_Vehicle_Model();
        private Vehicle_SubCategories_Model db_vehicle_SubCategories_Model = new Vehicle_SubCategories_Model();

        // GET: api/Listings
        public IQueryable<Listing> GetListing()
        {
            return db.Listing;
        }

        // GET: api/Listings/5
        [ResponseType(typeof(Listing))]
        public async Task<IHttpActionResult> GetListing(int id)
        {
            Listing listing = await db.Listing.FindAsync(id);
            if (listing == null)
            {
                return NotFound();
            }

            return Ok(listing);
        }

        // PUT: api/Listings/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutListing(int id, Listing listing)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != listing.IDListing)
            {
                return BadRequest();
            }

            db.Entry(listing).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ListingExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Listings
        [Route("api/newListing")]
        [HttpPost]
        [ResponseType(typeof(Listing))]
        public async Task<IHttpActionResult> PostListing(Listing listing)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Listing.Add(listing);
            await db.SaveChangesAsync();

            if (listing.Vehicle.Accessories.Length > 0)
            {
                for (int i = 0; i < listing.Vehicle.Accessories.Length; i++)
                {
                    db_vehicleAccesories_vehicle.VehicleAccessories_Vehicle.Add(
                        new VehicleAccessories_Vehicle 
                        { 
                            VehicleAccessoriesID = listing.Vehicle.Accessories[i],
                            VehicleID = listing.VehicleID 
                        });
                }

                try
                {
                    await db_vehicleAccesories_vehicle.SaveChangesAsync();
                }
                catch (DbUpdateException)
                {
                    return BadRequest();
                }
            }

            db_vehicle_SubCategories_Model.Vehicle_SubCategories.Add(
                new Vehicle_SubCategories 
                {               
                    SubCategoryID = listing.Vehicle.SubCategoryID,
                    VehicleID = listing.VehicleID
                });

            try
            {
                await db_vehicle_SubCategories_Model.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                return BadRequest();
            }

            return Ok("Success");
        }

        // DELETE: api/Listings/5
        [ResponseType(typeof(Listing))]
        public async Task<IHttpActionResult> DeleteListing(int id)
        {
            Listing listing = await db.Listing.FindAsync(id);
            if (listing == null)
            {
                return NotFound();
            }

            db.Listing.Remove(listing);
            await db.SaveChangesAsync();

            return Ok(listing);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ListingExists(int id)
        {
            return db.Listing.Count(e => e.IDListing == id) > 0;
        }
    }
}