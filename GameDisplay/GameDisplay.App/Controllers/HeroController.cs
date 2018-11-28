using GameDisplay.Domain;
using GameDisplay.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace GameDisplay.App.Controllers
{
    public class HeroController : ApiController
    {
        // GET: api/Hero
        public IEnumerable<Hero> Get()
        {
            HeroService service = new HeroService();
            return service.GetAllHeros();
        }

        // GET: api/Hero/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Hero
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Hero/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Hero/5
        public void Delete(int id)
        {
        }
    }
}
