using GameDisplay.Dto;
using GameDisplay.Service;
using System.Collections.Generic;
using System.Web.Http;

namespace GameDisplay.App.Controllers
{
    public class StockMonitorController : ApiController
    {
        // GET: api/Hero
        public IEnumerable<StockMonitorDto> Get()
        {
            StockMonitorService service = new StockMonitorService();
            return service.GetAll();
        }

        // GET: api/Hero/5
        public StockMonitorDto Get(string code)
        {
            StockMonitorService service = new StockMonitorService();
            return service.GetDetail(code);
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
