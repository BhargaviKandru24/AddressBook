using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace AddressBook.Controllers
{
   
    public class HomeController : Controller
    {
       
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult ViewContacts()
        {
            return PartialView();
        }

        public ActionResult AddContact()
        {
            return PartialView();
        }
        
        public ActionResult ContactInformation()
        {
            return PartialView();
        }
       
    }
}