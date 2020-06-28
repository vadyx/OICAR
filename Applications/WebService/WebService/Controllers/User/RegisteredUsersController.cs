using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Core.Metadata.Edm;
using System.Data.Entity.Infrastructure;
using System.Data.SqlClient;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Http.Results;
using WebServis.Models.Registration;
using WebServis.Models.Verification;

namespace WebServis.Controllers.User
{
    public class RegisteredUsersController : ApiController
    {
        private RegisteredUserModel db = new RegisteredUserModel();

        // GET: api/RegisteredUsers/
        [Route("api/users")]
        public IQueryable<RegisteredUser> GetRegisteredUsers()
        {
            return db.RegisteredUsers;
        }

        // GET: api/user/username
        [ResponseType(typeof(RegisteredUser))]
        [Route("api/user/{username}")]
        public async Task<IHttpActionResult> GetRegisteredUser(string username)
        {
            RegisteredUser registeredUser = await db.RegisteredUsers.Where(user => user.LoginCredentials.Username == username).SingleOrDefaultAsync();
            if (registeredUser == null)
            {
                return BadRequest("Not found");
            }

            return Ok(registeredUser);
        }

        [ResponseType(typeof(void))]
        [HttpPut]
        [Route("api/user/setProfileImage/{id}")]
        public async Task<IHttpActionResult> PutProfileImageForRegisteredUser(int id, [FromBody]string profileImageBase64)
        {
            if (!RegisteredUserExists(id))
            {
                return BadRequest("User with given ID does not exist.");
            }

            if (profileImageBase64 == null)
            {
                return BadRequest("Given value cannot be null.");
            }

            byte[] profileImageBytes = Convert.FromBase64String(profileImageBase64);
            RegisteredUser registeredUser = await db.RegisteredUsers.Where(user => user.IDRegisteredUser == id).SingleOrDefaultAsync();
            registeredUser.ProfileImage = profileImageBytes;
            db.Entry(registeredUser).Property(user => user.LoginCredentialsID).IsModified = false;
            db.Entry(registeredUser).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return BadRequest(ex.Message);
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        [ResponseType(typeof(void))]
        [HttpPut]
        [Route("api/user/setDriverLicenseImage/{id}")]
        public async Task<IHttpActionResult> PutDriverLicenseImageForRegisteredUser(int id, [FromBody]string driverLicenseImageBase64)
        {
            if (!RegisteredUserExists(id))
            {
                return BadRequest("User with given ID does not exist.");
            }

            if (driverLicenseImageBase64 == null)
            {
                return BadRequest("Given value cannot be null.");
            }

            byte[] driverLicenseBytes = Convert.FromBase64String(driverLicenseImageBase64);
            RegisteredUser registeredUser = await db.RegisteredUsers.Where(user => user.IDRegisteredUser == id).SingleOrDefaultAsync();
            registeredUser.Verification.DriverLicense = driverLicenseBytes;
            registeredUser.Verification.DriverLicenseVerified = true;
            registeredUser.Verification.DriverLicenseVerificationExpirationDate = DateTime.Today.AddYears(1);
            db.Entry(registeredUser).Property(user => user.LoginCredentialsID).IsModified = false;
            db.Entry(registeredUser).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return BadRequest(ex.Message);
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        [ResponseType(typeof(void))]
        [HttpPut]
        [Route("api/user/setPersonalIDImage/{id}")]
        public async Task<IHttpActionResult> PutPersonalIDImageForRegisteredUser(int id, [FromBody]string personalIDImageBase64)
        {
            if (!RegisteredUserExists(id))
            {
                return BadRequest("User with given ID does not exist.");
            }

            if (personalIDImageBase64 == null)
            {
                return BadRequest("Given value cannot be null.");
            }

            byte[] personalIDBytes = Convert.FromBase64String(personalIDImageBase64);
            RegisteredUser registeredUser = await db.RegisteredUsers.Where(user => user.IDRegisteredUser == id).SingleOrDefaultAsync();
            registeredUser.Verification.PersonalIdentification = personalIDBytes;
            registeredUser.Verification.PersonalIdentificationVerified = true;
            registeredUser.Verification.PersonalIdentificationVerificationExpirationDate = DateTime.Today.AddYears(1);
            db.Entry(registeredUser).Property(user => user.LoginCredentialsID).IsModified = false;
            db.Entry(registeredUser).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return BadRequest(ex.Message);
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/user
        [ResponseType(typeof(RegisteredUser))]
        [Route("api/registration")]
        public async Task<IHttpActionResult> PostRegisteredUser(RegisteredUser registeredUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            registeredUser.LoginCredentials.Pwd = PasswordSecurity.PasswordStorage.CreateHash(registeredUser.LoginCredentials.Pwd);
            Image defaultProfileImage = Image.FromFile(System.Web.Hosting.HostingEnvironment.MapPath("~") + @"\Images\user_default_image.png");
            registeredUser.ProfileImage = ImageToBytesConverter(defaultProfileImage);
            registeredUser.Verification = new Verification
            {
                DriverLicense = null,
                DriverLicenseVerified = false,
                PersonalIdentificationVerified = false,
                PersonalIdentification = null
            };
            registeredUser.Rating = (decimal)0.0;

            db.RegisteredUsers.Add(registeredUser);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException e)
            when (e.InnerException?.InnerException is SqlException sqlEx && (sqlEx.Number == 2601 || sqlEx.Number == 2627))
            {
                string message = "";
                string data = sqlEx.Message.Split('(', ')')[1];
                if (data == registeredUser.LoginCredentials.Username)
                    message = "UQ_USERNAME";
                else if (data == registeredUser.Email)
                    message = "UQ_EMAIL";


                return BadRequest(message);
            }

            return Ok(true);
        }

        private bool RegisteredUserExists(int id)
        {
            return db.RegisteredUsers.Count(e => e.IDRegisteredUser == id) > 0;
        }

        public static byte[] ImageToBytesConverter(Image image)
        {
            ImageConverter imageConverter = new ImageConverter();
            byte[] imageByte = (byte[])imageConverter.ConvertTo(image, typeof(byte[]));
            return imageByte;
        }
    }
}