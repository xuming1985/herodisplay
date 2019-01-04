using GameDisplay.App.Filters;
using GameDisplay.App.Models;
using GameDisplay.Dto;
using GameDisplay.Service;
using System.Web.Http;

namespace GameDisplay.App.Controllers
{
    [AuthTokenFilter]
    [RoutePrefix("api/user")]
    public class UserController : ApiController
    {
        // GET: api/Hero
        [HttpPost]
        [Route("pagedlist")]
        public PagedResult<BUserDto> Get(BUserQueryInput input)
        {
            PagedResult<BUserDto> result = new PagedResult<BUserDto>();
            BUesrService service = new BUesrService();
            result.Data = service.Query(input);
            result.Total = input.Total;
            return result;
        }

    }
}
