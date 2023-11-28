using MagniCollegeManagementSystem.App_Start;
using System;
using System.Web.Mvc;
using System.Web.Routing;

namespace MagniCollegeManagementSystem
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            //routes.MapRoute(
            //    name: "Default",
            //    url: "{controller}/{action}/{id}",
            //    defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional },
            //    constraints: new
            //    {
            //        serverRoute = new ServerRouteContraint(url =>
            //         {
            //             return url.PathAndQuery.StartsWith("MVC",StringComparison.InvariantCultureIgnoreCase);
            //         })
            //    }
            //);

            routes.MapRoute(
               name: "angular",
               url: "{*url}",
               defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
           );
        }
    }
}
