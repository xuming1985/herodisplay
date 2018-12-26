using GameDisplay.Dto;
using GameDisplay.Service;
using System.Collections.Generic;
using System.Web.Http;
using JWT;
using JWT.Algorithms;
using JWT.Serializers;

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

            var payload = new Dictionary<string, object>
            {
                 { "UID", user.Id },
                 { "UName", user.RealName }
            };
            var secret = "123456789";

            IJwtAlgorithm algorithm = new HMACSHA256Algorithm();
            IJsonSerializer serializer = new JsonNetSerializer();
            IBase64UrlEncoder urlEncoder = new JwtBase64UrlEncoder();
            IJwtEncoder encoder = new JwtEncoder(algorithm, serializer, urlEncoder);

            string token = encoder.Encode(payload, secret);

            return token;
        }

        [HttpGet]
        [Route("GetCurrentLoginInformations")]
        public UserLoginInfoDto GetCurrentLoginInformations()
        {
            UserLoginInfoDto result = new UserLoginInfoDto();

            result.Account = "aaaa";
            result.IsAdmin = true;

            return result;
        }
    }
}
