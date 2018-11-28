using GameDisplay.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GameDisplay.App.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }

        /// <summary>
        /// 初始化数据
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult InitDataData()
        {
            InitService initService = new InitService();
            initService.InitData();
            return Json( "OK", JsonRequestBehavior.AllowGet);
        }
    }
}
