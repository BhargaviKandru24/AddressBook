using System.Collections.Generic;
using AddressBook.Models;
using PetaPoco;

namespace AddressBook.Services
{
    public class ContactService : IContactService
    {
        Database DB { get; }
        public ContactService(Database db)
        {
            this.DB = db;
        }

        public Contact AddContact(Contact contact)
        {
            Contactdb.Contact contactTable = new Contactdb.Contact();
            contactTable = ConfigurationServices.mapper.Map<Contact, Contactdb.Contact>(contact);
            contactTable.AuditFieldsOnCreate();
            DB.Insert(contactTable);
            contact.Id = contactTable.Id;
            return contact;
        }

        public IList<Contact> GetContacts()
        {
            var contacts = DB.Fetch<Contactdb.Contact>("select * from Contacts");
            return Extensions.MapList<Contactdb.Contact, Contact>(contacts);
        }

        public Contact GetContactInformation(int id)
        {
            var contact = DB.FirstOrDefault<Contactdb.Contact>("select * from Contacts where Id = " + @id + "");
            Contact contactModel = new Contact();
            return ConfigurationServices.mapper.Map<Contactdb.Contact, Contact>(contact);
        }

        public void UpdateContact(Contact contact)
        {
            Contactdb.Contact ContactTable = new Contactdb.Contact();

            ContactTable = ConfigurationServices.mapper.Map<Contact, Contactdb.Contact>(contact);
            ContactTable.AuditFieldsOnCreate();
            DB.Update(ContactTable);
        }

        public void DeleteContact(int id)
        {
            DB.Delete<Contactdb.Contact>("where Id = " + id + "");
        }
    }
}