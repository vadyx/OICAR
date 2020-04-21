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

        // GET: api/RegisteredUsers/5
        [ResponseType(typeof(RegisteredUser))]
        public async Task<IHttpActionResult> GetRegisteredUser(int id)
        {
            RegisteredUser registeredUser = await db.RegisteredUsers.FindAsync(id);
            if (registeredUser == null)
            {
                return NotFound();
            }

            return Ok(registeredUser);
        }

        // PUT: api/RegisteredUsers/5
        [ResponseType(typeof(void))]
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
                string value = "";
                string data = sqlEx.Message.Split('(', ')')[1];
                if (data == registeredUser.LoginCredentials.Username)
                    value = "Username";
                else if (data == registeredUser.Email)
                    value = "Email";

                var json = new
                {
                    Value = value,
                    Data = data,
                    Error = sqlEx.Message
                };

                string jsonResponse = JsonConvert.SerializeObject(json);

                return Json(jsonResponse);
            }

            return CreatedAtRoute("DefaultApi", new { id = registeredUser.IDRegisteredUser }, registeredUser);
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