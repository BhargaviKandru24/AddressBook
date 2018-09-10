using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AddressBook.Models;

namespace AddressBook.Services
{
    public interface IContactService
    {
        Contact AddContact(Contact contact);
        IList<Contact> GetContacts();
        Contact GetContactInformation(int id);
        void UpdateContact(Contact contact);
        void DeleteContact(int id);
    }
}
