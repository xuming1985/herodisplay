using GameDisplay.App.Filters;
using GameDisplay.App.Models;
using GameDisplay.Dto;
using GameDisplay.Service;
using System.Collections.Generic;
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

        [HttpGet]
        [Route("getroletree")]
        public List<TreeItem> GetRoleTree()
        {
            BUesrService service = new BUesrService();
            return service.GetRoleTree();
        }

        [HttpPost]
        [Route("update")]
        public bool Update(BUserForEditDto dto)
        {
            BUesrService service = new BUesrService();
            return service.Update(dto);
        }

        [HttpPost]
        [Route("updatepassword")]
        public OperateResult UpdatePassword(PasswordResetDto dto)
        {
            BUesrService service = new BUesrService();
            return service.UpdatePassword(dto);
        }

        [HttpPost]
        [Route("resetpassword")]
        public OperateResult ResetPassword(PasswordResetDto dto)
        {
            BUesrService service = new BUesrService();
            return service.ResetPassword(dto);
        }
    }
}
