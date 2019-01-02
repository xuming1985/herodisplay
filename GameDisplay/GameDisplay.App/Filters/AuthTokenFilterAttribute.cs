using GameDisplay.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace GameDisplay.App.Filters
{
    public class AuthTokenFilterAttribute: AuthorizationFilterAttribute
    {
        public override void OnAuthorization(HttpActionContext actionContext)
        {
            //如果用户方位的Action带有AllowAnonymousAttribute，则不进行授权验证
            if (actionContext.ActionDescriptor.GetCustomAttributes<AllowAnonymousAttribute>().Any())
            {
                return;
            }

            //接受客户端预请求
            if (actionContext.Request.Method == HttpMethod.Options)
            {
                actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Accepted);
                return;
            }

            var headers = actionContext.Request.Headers;
            if (headers.Authorization == null || headers.Authorization.Scheme!="token")
            {
                actionContext.Response = actionContext.Request.CreateErrorResponse(HttpStatusCode.Unauthorized, new HttpError("Token 不正确"));
                return;
            }

            string token = headers.Authorization.Parameter;

            if (token == null)
            {
                //如果验证不通过，则返回401错误，并且Body中写入错误原因
                actionContext.Response = actionContext.Request.CreateErrorResponse(HttpStatusCode.Unauthorized, new HttpError("Token 不正确"));
                return;
            }

            JWTPayloadInfo payload = Cryptogram.JwtDecode(token);
            if (payload == null)
            {
                //如果验证不通过，则返回401错误，并且Body中写入错误原因
                actionContext.Response = actionContext.Request.CreateErrorResponse(HttpStatusCode.Unauthorized, new HttpError("Token 不正确"));
                return;
            }

            base.OnAuthorization(actionContext);
        }
    }
}