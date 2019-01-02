using GameDisplay.Dto;
using GameDisplay.Service;
using System.Collections.Generic;
using System.Web.Http;
using JWT;
using JWT.Algorithms;
using JWT.Serializers;
using GameDisplay.App.Filters;
using GameDisplay.Common;

namespace GameDisplay.App.Controllers
{
    [RoutePrefix("api/login")]
    public class LoginController : ApiController
    {
        [HttpOptions]
        [HttpPost]
        public string Login(LoginInput input)
        {
            BUesrService service = new BUesrService();
            var user = service.CheckUser(input);

            JWTPayloadInfo payload = new JWTPayloadInfo()
            {
                userid = user.Id,
                username = user.RealName
            };

            string token = Cryptogram.JwtEncode(payload);

            return token;
        }

        [AuthTokenFilter]
        [HttpGet]
        [Route("GetCurrentLoginInformations")]
        public UserLoginInfoDto GetCurrentLoginInformations()
        {
            UserLoginInfoDto result = new UserLoginInfoDto();

            string token = ControllerContext.Request.Headers.Authorization.Parameter;

            JWTPayloadInfo payload = Cryptogram.JwtDecode(token);
            if (payload != null)
            {
                result.Account = payload.username;
                result.IsAdmin = true;
            }
            else
            {
                result = null;
            }

            return result;
        }
    }
}
