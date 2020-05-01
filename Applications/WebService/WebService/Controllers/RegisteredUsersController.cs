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

namespace WebServis.Controllers
{
    public class RegisteredUsersController : ApiController
    {
        private RegisteredUserModel db = new RegisteredUserModel();

        // GET: api/RegisteredUsers/
        public IQueryable<RegisteredUser> GetRegisteredUsers()
        {
            return db.RegisteredUsers;
        }

        // GET: api/RegisteredUsers/username
        [ResponseType(typeof(RegisteredUser))]
        [Route("api/RegisteredUsers/{username}")]
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
        [Route("api/RegisteredUsers/setProfileImage/{id}")]
        public async Task<IHttpActionResult> PutProfileImageForRegisteredUser(int id, [FromBody]string profileImageBase64)
        {     
            if (!RegisteredUserExists(id) || profileImageBase64 == null)
            {
                return BadRequest();
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
            catch (DbUpdateConcurrencyException)
            {
                return BadRequest();
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/RegisteredUsers
        [ResponseType(typeof(RegisteredUser))]
        public async Task<IHttpActionResult> PostRegisteredUser(RegisteredUser registeredUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            registeredUser.LoginCredentials.Pwd = PasswordSecurity.PasswordStorage.CreateHash(registeredUser.LoginCredentials.Pwd);
            Image defaultProfileImage = Image.FromFile(System.Web.Hosting.HostingEnvironment.MapPath("~") + @"\Images\user_default_image.png");
            registeredUser.ProfileImage = ImageToBytesConverter(defaultProfileImage);
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

        // DELETE: api/RegisteredUsers/5
        [ResponseType(typeof(RegisteredUser))]
        public async Task<IHttpActionResult> DeleteRegisteredUser(int id)
        {
            RegisteredUser registeredUser = await db.RegisteredUsers.FindAsync(id);
            if (registeredUser == null)
            {
                return NotFound();
            }

            db.RegisteredUsers.Remove(registeredUser);
            await db.SaveChangesAsync();

            return Ok(registeredUser);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
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