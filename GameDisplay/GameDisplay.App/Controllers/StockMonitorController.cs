using GameDisplay.Dto;
using GameDisplay.Service;
using System.Collections.Generic;
using System.Web.Http;

namespace GameDisplay.App.Controllers
{
    [RoutePrefix("api/StockMonitor")]
    public class StockMonitorController : ApiController
    {
        // GET: api/Hero
        [HttpGet]
        public IEnumerable<StockMonitorDto> Get()
        {
            StockMonitorService service = new StockMonitorService();
            return service.GetAll();
        }

        // GET: api/Hero/5
        [HttpGet]
        [Route("{code}")]
        public StockMonitorDto Get(string code)
        {
            StockMonitorService service = new StockMonitorService();
            return service.GetDetail(code);
        }

        [HttpGet]
        [Route("TimeDiagram/{code}")]
        public TimeDiagramDto TimeDiagram(string code)
        {
            StockMonitorService service = new StockMonitorService();
            return service.GetTimeDiagram(code);
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
