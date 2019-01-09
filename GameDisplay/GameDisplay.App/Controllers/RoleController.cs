using GameDisplay.App.Filters;
using GameDisplay.Dto;
using GameDisplay.Service;
using System.Collections.Generic;
using System.Web.Http;

namespace GameDisplay.App.Controllers
{
    [AuthTokenFilter]
    [RoutePrefix("api/role")]
    public class RoleController : ApiController
    {
        [HttpGet]
        public List<BItem> Get()
        {
            BRoleService service = new BRoleService();
            return service.GetAll();
        }
    }
}
