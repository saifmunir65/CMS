using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Routing;

namespace MagniCollegeManagementSystem.App_Start
{
    public class ServerRouteContraint : IRouteConstraint
    {
        private readonly Func<Uri, bool> predicate;

        public ServerRouteContraint(Func<Uri, bool> predicate)
        {
            this.predicate = predicate;
        }
        public bool Match(HttpContextBase httpContext, Route route, string parameterName, 
            RouteValueDictionary values, RouteDirection routeDirection)
        {
            return this.predicate(httpContext.Request.Url);
        }
    }
}