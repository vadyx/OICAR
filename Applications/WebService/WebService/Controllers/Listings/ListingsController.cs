using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Core.Common;
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
using WebServis.Models.ResponseModels;
using WebServis.Models.Vehicle;
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
        private CategoryModel db_category = new CategoryModel();
        private Vehicle_SubCategories_Model db_subCategory_Vehicle = new Vehicle_SubCategories_Model();
        private FuelTypeModel db_fuelType = new FuelTypeModel();
        private DriveTypeModel db_driveType = new DriveTypeModel();
        private GearShiftTypeModel db_gearShiftType = new GearShiftTypeModel();
        private VehicleAccessoriesModel db_vehicleAccessories = new VehicleAccessoriesModel();
        private RegisteredUserModel db_user = new RegisteredUserModel();
        private SubCategoryModel db_subCategory = new SubCategoryModel();

        // GET: api/Listings
        public IQueryable<Listing> GetListing()
        {
            return db.Listing;
        }

        [Route("api/shortListings/{categoryID}")]
        [ResponseType(typeof(ShortListingResponseModel))]
        public IHttpActionResult GetListings(int categoryID)
        {
            List<ShortListingResponseModel> listingResponseModels;
            try
            {
                listingResponseModels = new List<ShortListingResponseModel>();
                foreach (Listing listing in db.Listing.Where(l => l.Vehicle.CategoryID == categoryID && l.AvailableToDate >= DateTime.Today))
                {
                    bool listingHasNoImage = db_vehicleImageModel.VehicleImage.Where(image => image.VehicleID == listing.VehicleID).FirstOrDefault() == null;
                    listingResponseModels.Add(
                        new ShortListingResponseModel
                        {
                            IDListing = listing.IDListing,
                            Title = listing.Title,
                            Category = db_category.Category.Where(cat => cat.IDCategory == listing.Vehicle.CategoryID).First().CategoryName,
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

            listingResponseModels.Reverse();
            return Ok(listingResponseModels);
        }

        [Route("api/shortListings/{categoryID}/{locationX}/{locationY}")]
        [ResponseType(typeof(ShortListingResponseModel))]
        public IHttpActionResult GetListings(int categoryID, double locationX, double locationY)
        {
            List<ShortListingResponseModel> listingResponseModels;
            List<ShortListingResponseModel> locationListingResponseModels;
            List<ShortListingResponseModel> noLocationListingResponseModels;
            try
            {
                locationListingResponseModels = new List<ShortListingResponseModel>();
                noLocationListingResponseModels = new List<ShortListingResponseModel>();
                foreach (Listing listing in db.Listing.Where(l => l.Vehicle.CategoryID == categoryID && l.AvailableToDate >= DateTime.Today))
                {
                    bool hasLocation = listing.LocationCoordinateX != null && listing.LocationCoordinateY != null;
                    bool listingHasNoImage = db_vehicleImageModel.VehicleImage.Where(image => image.VehicleID == listing.VehicleID).FirstOrDefault() == null;
                    if (hasLocation)
                    {                  
                        locationListingResponseModels.Add(
                            new ShortListingResponseModel
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
                                Distance = CalculateDistance(locationX, locationY, (double)listing.LocationCoordinateX, (double)listing.LocationCoordinateY),
                                LocationX = listing.LocationCoordinateX,
                                LocationY = listing.LocationCoordinateY
                            });
                    }
                    else
                    {
                        noLocationListingResponseModels.Add(
                              new ShortListingResponseModel
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
                              });

                    }
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

            locationListingResponseModels.Sort((x,y) => x.Distance.CompareTo(y.Distance));
            noLocationListingResponseModels.Reverse();

            listingResponseModels = new List<ShortListingResponseModel>(locationListingResponseModels.Count + noLocationListingResponseModels.Count);
            locationListingResponseModels.ForEach(lrm => listingResponseModels.Add(lrm));
            noLocationListingResponseModels.ForEach(lrm => listingResponseModels.Add(lrm));
            return Ok(listingResponseModels);
        }


        [Route("api/highlightedListings")]
        [ResponseType(typeof(ShortListingResponseModel))]
        public IHttpActionResult GetHighlightedListings()
        {
            List<ShortListingResponseModel> listingResponseModels;
            List<Listing> listings = db.Listing.OrderByDescending(l => l.IDListing).Take(10).ToList();
            try
            {
                listingResponseModels = new List<ShortListingResponseModel>();
                foreach (Listing listing in listings.Where(l => l.AvailableToDate >= DateTime.Today))
                {
                    bool listingHasNoImage = db_vehicleImageModel.VehicleImage.Where(image => image.VehicleID == listing.VehicleID).FirstOrDefault() == null;
                    listingResponseModels.Add(
                        new ShortListingResponseModel
                        {
                            IDListing = listing.IDListing,
                            Title = listing.Title,
                            Category = db_category.Category.Where(cat => cat.IDCategory == listing.Vehicle.CategoryID).First().CategoryName,
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


        [Route("api/getListing/{listingID}")]
        [ResponseType(typeof(ShortListingResponseModel))]
        public IHttpActionResult GetListing(int listingID)
        {
            ListingResponseModel listingResponseModel;
            try
            {
                Listing listing = db.Listing.Where(l => l.IDListing == listingID).FirstOrDefault();
                
                bool listingHasNoImage = db_vehicleImageModel.VehicleImage.Where(image => image.VehicleID == listing.VehicleID).FirstOrDefault() == null;
                List<String> images = new List<String>();
                if (!listingHasNoImage)
                {
                    foreach (var vehicleImage in db_vehicleImageModel.VehicleImage.Where(image => image.VehicleID == listing.VehicleID).ToList())
                    {
                        images.Add(Convert.ToBase64String(vehicleImage.VehicleImageString));
                    }
                   
                }

                List<String> accessories = new List<String>();
                foreach(var accessory in db_vehicleAccesories_vehicle.VehicleAccessories_Vehicle.Where(access => access.VehicleID == listing.VehicleID))
                {
                    accessories.Add(db_vehicleAccessories.VehicleAccessories.Find(accessory.VehicleAccessoriesID).VehicleAccessories1);
                }

                RegisteredUser user = db_user.RegisteredUsers.Find(listing.UserID);

                int? subCategoryID = db_subCategory_Vehicle.Vehicle_SubCategories.Where(subCat => subCat.VehicleID == listing.Vehicle.IDVehicle).FirstOrDefault().SubCategoryID;
                string subCategory = "";
                if (subCategoryID != null)
                {
                    subCategory = db_subCategory.SubCategory.Find(subCategoryID).SubCategory1;
                }

                listingResponseModel =
                    new ListingResponseModel
                    {
                        IDListing = listing.IDListing,
                        Title = listing.Title,
                        ListingDescription = listing.ListingDescription,
                        Price = listing.Price,
                        PriceBy = db_priceByModel.PriceBy.Where(priceBy => priceBy.IDPriceBy == listing.PriceByID).SingleOrDefault().PriceBy1,
                        AvailableFromDate = listing.AvailableFromDate,
                        AvailableToDate = listing.AvailableToDate,
                        LocationCoordinateX = listing.LocationCoordinateX,
                        LocationCoordinateY = listing.LocationCoordinateY,
                        Images = listingHasNoImage ? new string[0] : images.ToArray(),
                        Vehicle = new VehicleResponseModel
                        {
                            Category = db_category.Category.Where(cat => cat.IDCategory == listing.Vehicle.CategoryID).First().CategoryName,
                            VehicleManufacturer = db_vehicleManufacturerModel.VehicleManufacturer.Where(v => v.IDVehicleManufacturer == listing.Vehicle.VehicleManufacturerID).SingleOrDefault().ManufacturerName,
                            VehicleModel = listing.Vehicle.VehicleModelID == null ? "" : db_vehicleModelModel.VehicleModel.Where(v => v.IDVehicleModel == listing.Vehicle.VehicleModelID).SingleOrDefault().ModelName,
                            SubCategory = subCategory,
                            ManufacturingYear = listing.Vehicle.ManufacturingYear,
                            FuelType = listing.Vehicle.FuelTypeID == null ? "" : db_fuelType.FuelType.Where(fuelType => fuelType.IDFuelType == listing.Vehicle.FuelTypeID).SingleOrDefault().FuelType1,
                            DriveType = listing.Vehicle.DriveTypeID == null ? "" : db_driveType.DriveType.Where(driveType => driveType.IDDriveType == listing.Vehicle.DriveTypeID).SingleOrDefault().DriveType1,
                            GearShiftType = listing.Vehicle.GearShiftTypeID == null ? "" : db_gearShiftType.GearShiftType.Where(gearShiftType => gearShiftType.IDGearShiftType == listing.Vehicle.GearShiftTypeID).SingleOrDefault().GearShiftType1,
                            Kilometers = listing.Vehicle.Kilometers,
                            EnginePower = listing.Vehicle.EnginePower,
                            Accessories = accessories.ToArray()
                        },
                        User = new ListingUserResponseModel
                        {
                            IDUser = listing.UserID,
                            FirstName = user.FirstName,
                            LastName = user.LastName,
                            Email = user.Email,
                            Rating = user.Rating,
                            RegistrationDate = user.RegistrationDate,
                            ProfileImage = user.ProfileImage
                        }
                    };
                
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }


            return Ok(listingResponseModel);
        }

        [Route("api/userListings/{userID}")]
        [ResponseType(typeof(ShortListingResponseModel))]
        public IHttpActionResult GetListingsForUser(int userID)
        {
            List<ShortListingResponseModel> listingResponseModels;
            try
            {
                listingResponseModels = new List<ShortListingResponseModel>();
                foreach (Listing listing in db.Listing.Where(l => l.UserID == userID))
                {
                    bool listingHasNoImage = db_vehicleImageModel.VehicleImage.Where(image => image.VehicleID == listing.VehicleID).FirstOrDefault() == null;
                    listingResponseModels.Add(
                        new ShortListingResponseModel
                        {
                            IDListing = listing.IDListing,
                            Title = listing.Title,
                            Category = db_category.Category.Where(cat => cat.IDCategory == listing.Vehicle.CategoryID).First().CategoryName,
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

            listingResponseModels.Reverse();
            return Ok(listingResponseModels);
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

        private double CalculateDistance(double lat1, double lon1, double lat2, double lon2)
        {
            if ((lat1 == lat2) && (lon1 == lon2))
            {
                return 0;
            }
            else
            {
                double theta = lon1 - lon2;
                double dist = Math.Sin(deg2rad(lat1)) * Math.Sin(deg2rad(lat2)) + Math.Cos(deg2rad(lat1)) * Math.Cos(deg2rad(lat2)) * Math.Cos(deg2rad(theta));
                dist = Math.Acos(dist);
                dist = rad2deg(dist);
                dist = dist * 60 * 1.1515;

                dist = dist * 1.609344;

                return (dist);
            }
        }

        private double deg2rad(double deg)
        {
            return (deg * Math.PI / 180.0);
        }

        private double rad2deg(double rad)
        {
            return (rad / Math.PI * 180.0);
        }

        private bool ListingExists(int id)
        {
            return db.Listing.Count(e => e.IDListing == id) > 0;
        }
    }
}