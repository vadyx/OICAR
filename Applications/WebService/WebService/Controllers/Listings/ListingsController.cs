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
using WebServis.Models.Listings;
using WebServis.Models.Registration;
using WebServis.Models.ViewModels;

namespace WebServis.Controllers.Listings
{
    public class ListingsController : ApiController
    {
        private ListingModel db = new ListingModel();
        private VehicleAccessories_Vehicle_Model db_vehicleAccesories_vehicle = new VehicleAccessories_Vehicle_Model();
        private Vehicle_SubCategories_Model db_vehicle_SubCategories_Model = new Vehicle_SubCategories_Model();
        private VehicleImageModel db_vehicleImageModel = new VehicleImageModel();
        private PriceByModel db_priceByModel = new PriceByModel();
        private RegisteredUserModel db_registeredUserModel = new RegisteredUserModel();
        private VehicleManufacturerModel db_vehicleManufacturerModel = new VehicleManufacturerModel();
        private VehicleModelModel db_vehicleModelModel = new VehicleModelModel();

        // GET: api/Listings
        public IQueryable<Listing> GetListing()
        {
            return db.Listing;
        }

        [Route("api/shortListings/{categoryID}")]
        [ResponseType(typeof(ListingResponseModel))]
        public IHttpActionResult GetListing(int categoryID)
        {
            List<ListingResponseModel> listingResponseModels;
            try
            {
                listingResponseModels = new List<ListingResponseModel>();
                foreach (Listing listing in db.Listing.Where(l => l.Vehicle.CategoryID == categoryID && l.AvailableToDate >= DateTime.Today))
                {
                    bool listingHasNoImage = db_vehicleImageModel.VehicleImage.Where(image => image.VehicleID == listing.VehicleID).FirstOrDefault() == null;
                    listingResponseModels.Add(
                        new ListingResponseModel
                        {
                            IDListing = listing.IDListing,
                            Title = listing.Title,
                            ListingDescription = listing.ListingDescription == null ? "" : listing.ListingDescription,
                            Price = listing.Price,
                            PriceBy = db_priceByModel.PriceBy.Where(priceBy => priceBy.IDPriceBy == listing.PriceByID).SingleOrDefault().PriceBy1,
                            Rating = db_registeredUserModel.RegisteredUsers.Where(user => user.IDRegisteredUser == listing.UserID).SingleOrDefault().Rating,
                            Image = listingHasNoImage ? "" : Convert.ToBase64String(db_vehicleImageModel.VehicleImage.Where(image => image.VehicleID == listing.VehicleID).FirstOrDefault().VehicleImageString),
                            VehicleManufacturer = db_vehicleManufacturerModel.VehicleManufacturer.Where(v => v.IDVehicleManufacturer == listing.Vehicle.VehicleManufacturerID).SingleOrDefault().ManufacturerName,
                            VehicleModel = listing.Vehicle.VehicleModelID == null ? "" : db_vehicleModelModel.VehicleModel.Where(v => v.IDVehicleModel == listing.Vehicle.VehicleModelID).SingleOrDefault().ModelName
                        });
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
           

            return Ok(listingResponseModels);
        }

         //PUT: api/Listings/5
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

            if (listing.Vehicle.Accessories != null)
            {
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
            }

            if (listing.Vehicle.SubCategoryID != null)
            {
                db_vehicle_SubCategories_Model.Vehicle_SubCategories.Add(
                    new Vehicle_SubCategories
                    {
                        SubCategoryID = (int)listing.Vehicle.SubCategoryID,
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
            }

            if (listing.Images != null)
            {
                foreach (var image in listing.Images)
                {
                    byte[] imageBytes = Convert.FromBase64String(image);
                    db_vehicleImageModel.VehicleImage.Add(
                        new VehicleImage
                        {
                            VehicleImageString = imageBytes,
                            VehicleID = listing.VehicleID
                        });
                }

                try
                {
                    await db_vehicleImageModel.SaveChangesAsync();
                }
                catch (DbUpdateException)
                {
                    return BadRequest();
                }
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