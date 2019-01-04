using GameDisplay.App.Filters;
using System.Web.Mvc;

namespace GameDisplay.App
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
