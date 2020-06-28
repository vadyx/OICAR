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
using WebServis.Models.Category;
using WebServis.Models.ListingReservation;
using WebServis.Models.Listings;
using WebServis.Models.Registration;
using WebServis.Models.ViewModels;

namespace WebServis.Controllers.ListingReservationNamespace
{
    public class ListingReservationsController : ApiController
    {
        private ListingReservationModel db = new ListingReservationModel();
        private ListingModel db_listingModel = new ListingModel();
        private VehicleImageModel db_vehicleImageModel = new VehicleImageModel();
        private PriceByModel db_priceByModel = new PriceByModel();
        private RegisteredUserModel db_registeredUserModel = new RegisteredUserModel();
        private VehicleManufacturerModel db_vehicleManufacturerModel = new VehicleManufacturerModel();
        private VehicleModelModel db_vehicleModelModel = new VehicleModelModel();
        private CategoryModel db_category = new CategoryModel();


        [Route("api/myReservations/{userID}")]
        public IHttpActionResult GetReservationForUser(int userID)
        {
            List<ShortListingReservationResponseModel> listingResponseModels;
            try
            {
                listingResponseModels = new List<ShortListingReservationResponseModel>();
                foreach (ListingReservation reservation in db.ListingReservation.Where(l => l.ReservatorID == userID))
                {
                    Listing listing = db_listingModel.Listing.Find(reservation.ListingID);
                    bool listingHasNoImage = db_vehicleImageModel.VehicleImage.Where(image => image.VehicleID == listing.VehicleID).FirstOrDefault() == null;
                    listingResponseModels.Add(
                        new ShortListingReservationResponseModel
                        {
                            IDListing = listing.IDListing,
                            Title = listing.Title,
                            Category = db_category.Category.Where(cat => cat.IDCategory == listing.Vehicle.CategoryID).First().CategoryName,
                            Price = listing.Price,
                            PriceBy = db_priceByModel.PriceBy.Where(priceBy => priceBy.IDPriceBy == listing.PriceByID).SingleOrDefault().PriceBy1,
                            Rating = db_registeredUserModel.RegisteredUsers.Where(user => user.IDRegisteredUser == listing.UserID).SingleOrDefault().Rating,
                            Image = listingHasNoImage ? "" : Convert.ToBase64String(db_vehicleImageModel.VehicleImage.Where(image => image.VehicleID == listing.VehicleID).FirstOrDefault().VehicleImageString),
                            VehicleManufacturer = db_vehicleManufacturerModel.VehicleManufacturer.Where(v => v.IDVehicleManufacturer == listing.Vehicle.VehicleManufacturerID).SingleOrDefault().ManufacturerName,
                            VehicleModel = listing.Vehicle.VehicleModelID == null ? "" : db_vehicleModelModel.VehicleModel.Where(v => v.IDVehicleModel == listing.Vehicle.VehicleModelID).SingleOrDefault().ModelName,
                            ReservationID = reservation.IDListingReservation
                        });
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

            listingResponseModels.Reverse();
            return Ok(listingResponseModels);
        }


        [Route("api/myListingsReserved/{userID}")]
        public IHttpActionResult GetListingReservedForUser(int userID)
        {
            List<ShortListingReservationResponseModel> listingResponseModels;
            try
            {
                listingResponseModels = new List<ShortListingReservationResponseModel>();
                foreach (ListingReservation reservation in db.ListingReservation.Where(l => l.ListingOwnerID == userID))
                {
                    Listing listing = db_listingModel.Listing.Find(reservation.ListingID);
                    bool listingHasNoImage = db_vehicleImageModel.VehicleImage.Where(image => image.VehicleID == listing.VehicleID).FirstOrDefault() == null;
                    listingResponseModels.Add(
                        new ShortListingReservationResponseModel
                        {
                            IDListing = listing.IDListing,
                            Title = listing.Title,
                            Category = db_category.Category.Where(cat => cat.IDCategory == listing.Vehicle.CategoryID).First().CategoryName,
                            Price = listing.Price,
                            PriceBy = db_priceByModel.PriceBy.Where(priceBy => priceBy.IDPriceBy == listing.PriceByID).SingleOrDefault().PriceBy1,
                            Rating = db_registeredUserModel.RegisteredUsers.Where(user => user.IDRegisteredUser == listing.UserID).SingleOrDefault().Rating,
                            Image = listingHasNoImage ? "" : Convert.ToBase64String(db_vehicleImageModel.VehicleImage.Where(image => image.VehicleID == listing.VehicleID).FirstOrDefault().VehicleImageString),
                            VehicleManufacturer = db_vehicleManufacturerModel.VehicleManufacturer.Where(v => v.IDVehicleManufacturer == listing.Vehicle.VehicleManufacturerID).SingleOrDefault().ManufacturerName,
                            VehicleModel = listing.Vehicle.VehicleModelID == null ? "" : db_vehicleModelModel.VehicleModel.Where(v => v.IDVehicleModel == listing.Vehicle.VehicleModelID).SingleOrDefault().ModelName,
                            ReservationID = reservation.IDListingReservation
                        });
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

            listingResponseModels.Reverse();
            return Ok(listingResponseModels);
        }


        //GET: api/ListingReservations/5
        [Route("api/reservation/{reservationID}/{userID}")]
        [ResponseType(typeof(ListingReservation))]
        public async Task<IHttpActionResult> GetListingReservation(int reservationID, int userID)
        {
            ListingReservation reservation = await db.ListingReservation.FindAsync(reservationID);

            if (reservation == null)
            {
                return NotFound();
            }

            Listing listing = await db_listingModel.Listing.FindAsync(reservation.ListingID);

            RegisteredUser user;
            if (reservation.ListingOwnerID == userID)
                user = await db_registeredUserModel.RegisteredUsers.FindAsync(reservation.ReservatorID);
            else
            {
                user = await db_registeredUserModel.RegisteredUsers.FindAsync(reservation.ListingOwnerID);
            }

            
            ReservationResponseModel reservationResponseModel;
            try
            {
                bool listingHasNoImage = db_vehicleImageModel.VehicleImage.Where(image => image.VehicleID == listing.VehicleID).FirstOrDefault() == null;
                reservationResponseModel = new ReservationResponseModel
                {
                    Image = listingHasNoImage ? "" : Convert.ToBase64String(db_vehicleImageModel.VehicleImage.Where(image => image.VehicleID == listing.VehicleID).FirstOrDefault().VehicleImageString),
                    Title = listing.Title,                                                  
                    VehicleManufacturer = db_vehicleManufacturerModel.VehicleManufacturer.Where(v => v.IDVehicleManufacturer == listing.Vehicle.VehicleManufacturerID).SingleOrDefault().ManufacturerName,
                    VehicleModel = listing.Vehicle.VehicleModelID == null ? "" : db_vehicleModelModel.VehicleModel.Where(v => v.IDVehicleModel == listing.Vehicle.VehicleModelID).SingleOrDefault().ModelName,
                    ReservationNumber = reservation.IDListingReservation,
                    Price = listing.Price,
                    DateFrom = reservation.FromDate,
                    DateTo = reservation.ToDate,
                    LocationX = listing.LocationCoordinateX,
                    LocationY = listing.LocationCoordinateY,
                    UserInfo = new ReservationUserResponseModel
                    { 
                        FirstName = user.FirstName,
                        Lastname = user.LastName,
                        Email = user.Email,
                        MobileNumber = reservation.MobileNumber,
                        ProfileImage = user.ProfileImage == null ? "" : Convert.ToBase64String(user.ProfileImage)
                    }
                };
                
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

            return Ok(reservationResponseModel);
        }


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