﻿using GameDisplay.App.Filters;
using GameDisplay.Common;
using GameDisplay.Dto;
using GameDisplay.Service;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Web.Http;

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
            if (user != null)
            {
                JWTPayloadInfo payload = new JWTPayloadInfo()
                {
                    userid = user.Id,
                    username = user.RealName
                };

                string token = Cryptogram.JwtEncode(payload);

                return token;
            }
            return string.Empty;
        }

        [AuthTokenFilter]
        [HttpGet]
        [Route("GetCurrentLoginInformations")]
        public UserLoginInfoDto GetCurrentLoginInformations()
        {
            BUesrService service = new BUesrService();
            UserLoginInfoDto result = new UserLoginInfoDto();
            IPrincipal principal = this.User;
            if (principal != null)
            {
                result = new UserLoginInfoDto();
                var identity = (ClaimsIdentity)principal.Identity;
                var claimId = identity.Claims.FirstOrDefault(o => o.Type == ClaimTypes.NameIdentifier);
                if (claimId != null)
                {
                    int id = int.Parse(claimId.Value);
                    result .User= service.Query(id);
                }
            }

            return result;
        }
    }
}
