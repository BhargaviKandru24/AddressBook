using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web.Mvc;
using System.Web.Routing;

namespace AddressBook.Controllers
{
    public class LogAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuted(ActionExecutedContext filterContext)
        {
            if (filterContext.ParentActionViewContext.ViewData.Model == null)
            {
                filterContext.Controller.ViewBag.message = "Please add contacts";
            }

        }

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            string message = Log("OnActionExecuting", filterContext.RouteData);
            filterContext.Controller.ViewBag.message = message; 
        }

        private string Log(string methodName, RouteData routeData)
        {
            var controllerName = routeData.Values["controller"];
            var actionName = routeData.Values["action"];
            var message = String.Format("{0}- controller:{1} action:{2}", methodName,
                                                                        controllerName,
                                                                        actionName);
            return message;
        }
    }
}