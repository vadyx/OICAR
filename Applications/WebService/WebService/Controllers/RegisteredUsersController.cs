using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Core.Metadata.Edm;
using System.Data.Entity.Infrastructure;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
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

        // PUT: api/RegisteredUsers/5
        [ResponseType(typeof(void))]
        [Route("api/RegisteredUsers/{id}")]
        public async Task<IHttpActionResult> PutRegisteredUser(int id, RegisteredUser registeredUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != registeredUser.IDRegisteredUser)
            {
                return BadRequest();
            }

            db.Entry(registeredUser).State = EntityState.Modified;

            try
            {
                db.Entry(registeredUser).Property(user => user.LoginCredentialsID).IsModified = false;
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RegisteredUserExists(id))
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

        // POST: api/RegisteredUsers
        [ResponseType(typeof(RegisteredUser))]
        public async Task<IHttpActionResult> PostRegisteredUser(RegisteredUser registeredUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            registeredUser.LoginCredentials.Pwd = PasswordSecurity.PasswordStorage.CreateHash(registeredUser.LoginCredentials.Pwd);
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
    }
}