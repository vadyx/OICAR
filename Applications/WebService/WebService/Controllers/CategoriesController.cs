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

namespace WebServis.Controllers
{
    public class CategoriesController : ApiController
    {
        private CategoryModel db = new CategoryModel();

        // GET: api/Categories
        public IQueryable<Category> GetCategory()
        {
            return db.Category;
        }
    }
}