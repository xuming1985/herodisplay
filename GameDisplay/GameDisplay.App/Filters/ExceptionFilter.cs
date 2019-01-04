using GameDisplay.App.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web;
using System.Web.Http.Filters;

namespace GameDisplay.App.Filters
{
    public class WebApiExceptionFilterAttribute : ExceptionFilterAttribute
    {
        private HttpResponseMessage GetResponse(int code, string message)
        {
            var resultModel = new ApiModelsBase() { Code = code, Message = message };

            return new HttpResponseMessage()
            {
                Content = new ObjectContent<ApiModelsBase>(resultModel, new JsonMediaTypeFormatter(), "application/json")
            };
        }

        public override void OnException(HttpActionExecutedContext actionExecutedContext)
        {
            var code = -1;
            var message = "请求失败!";

            //if (actionExecutedContext.Exception is UserDisplayException)
            //{
            //    message = actionExecutedContext.Exception.Message;
            //}
            //if (actionExecutedContext.Exception is UserLoginException)
            //{
            //    code = -2;
            //    message = actionExecutedContext.Exception.Message;
            //}

            if (actionExecutedContext.Response == null)
            {
                actionExecutedContext.Response = GetResponse(code, message);
            }

            Console.WriteLine(actionExecutedContext.Exception);
            base.OnException(actionExecutedContext);
        }
    }
}