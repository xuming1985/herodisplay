﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Formatting;
using System.Web.Http;
using System.Web.Http.Cors;

namespace GameDisplay.App
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API 配置和服务
            EnableCrossSiteRequests(config);

            // Web API 路由
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            //清除所有序列化格式
            config.Formatters.Clear();
            //添加Json格式的序列化器
            config.Formatters.Add(new JsonMediaTypeFormatter());
        }

        /// <summary>
        /// 允许跨域调用
        /// </summary>
        /// <param name="config"></param>
        private static void EnableCrossSiteRequests(HttpConfiguration config)
        {
            //对所有的请求来源没有任何限制
            var cors = new EnableCorsAttribute(
              origins: "*",
              headers: "*",
              methods: "*"
              );
            config.EnableCors(cors);
        }
    }
}
