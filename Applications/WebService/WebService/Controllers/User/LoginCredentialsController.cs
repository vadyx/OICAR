using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Configuration;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.UI.WebControls;
using WebServis.Models.Login;
using WebServis.Models.Registration;
using WebServis.Models.ViewModels;
using WebServis.PasswordSecurity;

namespace WebServis.Controllers.User
{
    public class LoginCredentialsController : ApiController
    {
        private LoginCredentialsModel db = new LoginCredentialsModel();
        private RegisteredUserModel dbRegistartion = new RegisteredUserModel();

        // GET: api/LoginCredentials/5
        [ResponseType(typeof(LoginCredentials))]
        public async Task<IHttpActionResult> GetLoginCredentials(int id)
        {
            LoginCredentials loginCredentials = await db.LoginCredentials.FindAsync(id);

            if (loginCredentials == null)
            {
                return NotFound();
            }

            return Ok(loginCredentials);
        }

        // PUT: api/LoginCredentials/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutLoginCredentials(int id, LoginCredentials loginCredentials)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != loginCredentials.IDLoginCredentials)
            {
                return BadRequest();
            }

            db.Entry(loginCredentials).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LoginCredentialsExists(id))
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

        // POST: api/login
        [ResponseType(typeof(LoginCredentials))]
        [Route("api/login")]
        public async Task<Object> CheckUserLogin(LoginCredentials loginCredentials)
        {
            foreach (var loginCred in db.LoginCredentials)
            {
                if (loginCred.Username.Equals(loginCredentials.Username) && PasswordStorage.VerifyPassword(loginCredentials.Pwd, loginCred.Pwd))
                {
                    RegisteredUser registeredUser = await dbRegistartion.RegisteredUsers.Where(user => user.LoginCredentials.Username == loginCredentials.Username).SingleOrDefaultAsync();
                    return Ok(new RegisteredUserResponseModel 
                    {
                        IDRegisteredUser = registeredUser.IDRegisteredUser, 
                        FirstName = registeredUser.FirstName,
                        LastName = registeredUser.LastName,
                        Email = registeredUser.Email,
                        Rating = registeredUser.Rating,
                        RegistrationDate = registeredUser.RegistrationDate,
                        ProfileImage = registeredUser.ProfileImage,
                        Verification = new VerificationResponseModel 
                        {
                            DriverLicenseVerified = registeredUser.Verification.DriverLicenseVerified,
                            DriverLicenseVerificationExpirationDate = registeredUser.Verification.DriverLicenseVerificationExpirationDate,
                            PersonalIdentificationVerified = registeredUser.Verification.PersonalIdentificationVerified,
                            PersonalIdentificationVerificationExpirationDate = registeredUser.Verification.PersonalIdentificationVerificationExpirationDate
                        }
                    });
                }
            }

            return false;
        }

        private bool LoginCredentialsExists(int id)
        {
            return db.LoginCredentials.Count(e => e.IDLoginCredentials == id) > 0;
        }
    }
}