using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Monit95App
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );

            //Этот маршрут добавил я. Думал, что это поможет передать непонятный маршрут дальше
            //на сторону frontend и там его перехватить Angular
            //routes.MapRoute(
            //    name: "spa-fallback",
            //    url: "app/{*url}",
            //    defaults: new { controller = "Home", action = "Index" }
            //    );
        }
    }
}
