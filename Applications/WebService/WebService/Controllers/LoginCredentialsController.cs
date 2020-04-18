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
using WebServis.Models.Login;
using WebServis.PasswordSecurity;

namespace WebServis.Controllers
{
    public class LoginCredentialsController : ApiController
    {
        private LoginCredentialsModel db = new LoginCredentialsModel();

        // GET: api/LoginCredentials
        public IQueryable<LoginCredentials> GetLoginCredentials()
        {
            return db.LoginCredentials;
        }

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

        // POST: api/LoginCredentials
        [ResponseType(typeof(LoginCredentials))]
        public bool PostLoginCredentials(LoginCredentials loginCredentials)
        {
            foreach (var loginCred in db.LoginCredentials)
            {
                if (loginCred.Username.Equals(loginCredentials.Username) && PasswordStorage.VerifyPassword(loginCredentials.Pwd, loginCred.Pwd))
                    return true;
            }

            return false;
        }

        // DELETE: api/LoginCredentials/5
        [ResponseType(typeof(LoginCredentials))]
        public async Task<IHttpActionResult> DeleteLoginCredentials(int id)
        {
            LoginCredentials loginCredentials = await db.LoginCredentials.FindAsync(id);
            if (loginCredentials == null)
            {
                return NotFound();
            }

            db.LoginCredentials.Remove(loginCredentials);
            await db.SaveChangesAsync();

            return Ok(loginCredentials);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool LoginCredentialsExists(int id)
        {
            return db.LoginCredentials.Count(e => e.IDLoginCredentials == id) > 0;
        }
    }
}