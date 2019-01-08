using GameDisplay.App.Filters;
using GameDisplay.App.Models;
using GameDisplay.Dto;
using GameDisplay.Service;
using System.Web.Http;

namespace GameDisplay.App.Controllers
{
    [AuthTokenFilter]
    [RoutePrefix("api/project")]
    public class ProjectController : ApiController
    {
        // GET: api/Hero
        [HttpPost]
        [Route("pagedlist")]
        public PagedResult<BProjectDto> Get(BProjectQueryInput input)
        {
            PagedResult<BProjectDto> result = new PagedResult<BProjectDto>();
            BProjectService service = new BProjectService();
            result.Data = service.Query(input);
            result.Total = input.Total;
            return result;
        }

        [HttpPost]
        [Route("create")]
        public bool Create(BProjectDto dto)
        {
            BProjectService service = new BProjectService();
            return service.Create(dto);
        }

        [HttpPost]
        [Route("update")]
        public bool Update(BProjectDto dto)
        {
            BProjectService service = new BProjectService();
            return service.Update(dto);
        }

        [HttpPost]
        [Route("updatemembers")]
        public bool UpdateMembers(BProjectDto dto)
        {
            BProjectService service = new BProjectService();
            return service.UpdateMembers(dto);
        }

        [HttpPost]
        [Route("addmodule")]
        public bool AddModule(BProjectModuleDto dto)
        {
            BProjectService service = new BProjectService();
            return service.AddModule(dto);
        }

        [HttpDelete]
        [Route("removemodule/{id}")]
        public bool RemoveModule(int id)
        {
            BProjectService service = new BProjectService();
            return service.RemoveModule(id);
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public bool Delete(int id)
        {
            BProjectService service = new BProjectService();
            return service.Delete(id);
        }
    }
}
