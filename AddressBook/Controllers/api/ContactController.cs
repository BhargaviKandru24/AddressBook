using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AddressBook.Models;

namespace AddressBook.Controllers.api
{
    public class ContactController : ApiController
    {
        public IList<Contact> GetContacts()
        {
            return MvcApplication.contactService.GetContacts();
        }

        public Contact GetContactInformation([FromUri]int id)
        {
            return  MvcApplication.contactService.GetContactInformation(id);
        }

        public IHttpActionResult PostContact([FromBody]Contact contact)
        {
            if (ModelState.IsValid)
            {
                contact = MvcApplication.contactService.AddContact(contact);
                return Ok(contact);
            }
                
            return BadRequest("Not a valid model");
        }

        public void PutContact([FromBody]Contact contact)
        {
            MvcApplication.contactService.UpdateContact(contact);
        }

        public void DeleteContact([FromUri]int id)
        {
            MvcApplication.contactService.DeleteContact(id);

        }
    }
}
