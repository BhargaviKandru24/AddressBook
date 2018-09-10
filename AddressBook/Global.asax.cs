using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using Autofac;
using AddressBook.Services;
using System.Web.Http;

namespace AddressBook
{
    public class MvcApplication : System.Web.HttpApplication
    {
        public static IContactService contactService;
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            var container = Autofac.IoCContainer();
            using (var scope = container.BeginLifetimeScope())
            {
                contactService = scope.Resolve<IContactService>();
            }
           
        }
    }
}
