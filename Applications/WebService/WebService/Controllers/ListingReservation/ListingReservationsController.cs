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
        private RatingModel db_ratingModel = new RatingModel();


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
                            Rating = reservation.Rating,
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
                            Rating = reservation.Rating,
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
        public IHttpActionResult GetListingReservation(int reservationID, int userID)
        {
            ListingReservation reservation = db.ListingReservation.Find(reservationID);

            if (reservation == null)
            {
                return NotFound();
            }

            Listing listing = db_listingModel.Listing.Find(reservation.ListingID);

            RegisteredUser user;
            if (reservation.ListingOwnerID == userID)
                user = db_registeredUserModel.RegisteredUsers.Find(reservation.ReservatorID);
            else
            {
                user = db_registeredUserModel.RegisteredUsers.Find(reservation.ListingOwnerID);
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
                    Price = reservation.Price,
                    Rating = reservation.Rating,
                    DateFrom = reservation.FromDate,
                    DateTo = reservation.ToDate,
                    LocationX = listing.LocationCoordinateX,
                    LocationY = listing.LocationCoordinateY,
                    UserInfo = new ReservationUserResponseModel
                    { 
                        IDUser = user.IDRegisteredUser,
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


        // POST: api/rateUser
        [Route("api/rate/{reservationID}")]
        [HttpPost]
        [ResponseType(typeof(ListingReservation))]
        public IHttpActionResult PostUserRating(int reservationID, Rating rating)
        {
      
                RegisteredUser user = db_registeredUserModel.RegisteredUsers.Find(rating.RatedUserID);
                List<Rating> ratings = db_ratingModel.Rating.Where(r => r.RatedUserID == rating.RatedUserID).ToList();
                ListingReservation listingReservation = db.ListingReservation.Find(reservationID);

                if (user == null || listingReservation == null)
                {
                    return NotFound();
                }

                if (rating.RatingValue < 0 || rating.RatingValue > 5)
                {
                    return BadRequest();
                }


                double sum = 0;
                sum += rating.RatingValue;

                foreach (var r in ratings)
                {
                    sum += r.RatingValue;
                }

                double newUserRating = sum;
                if (ratings.Any())
                    newUserRating = sum / (ratings.Count + 1);

                db_ratingModel.Rating.Add(rating);
                db_ratingModel.SaveChanges();

                user.Rating = (decimal)newUserRating;
                db_registeredUserModel.Entry(user).Property(u => u.LoginCredentialsID).IsModified = false;
                db_registeredUserModel.Entry(user).State = EntityState.Modified;
                db_registeredUserModel.SaveChanges();

                listingReservation.Rating = rating.RatingValue;
                db.Entry(listingReservation).Property(lr => lr.ListingID).IsModified = false;
                db.Entry(listingReservation).Property(lr => lr.ListingOwnerID).IsModified = false;
                db.Entry(listingReservation).Property(lr => lr.ReservatorID).IsModified = false;
                db.SaveChanges();
            



            return Ok("Success");
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