using GameDisplay.Domain;
using GameDisplay.Service;
using System.Collections.Generic;
using System.Web.Http;

namespace GameDisplay.App.Controllers
{
    public class SummonerSkillController : ApiController
    {
        // GET: api/Hero
        public IEnumerable<SummonerSkill> Get()
        {
            SummonerSkillService service = new SummonerSkillService();
            return service.GetAll();
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
