using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AddressBook.Services;
using Autofac;

namespace AddressBook
{
    public class Autofac
    {
        public static IContainer IoCContainer()
        {
            var builder = new ContainerBuilder();
            builder.RegisterType<ContactService>().As<IContactService>();
            builder.Register(c => new PetaPoco.Database("Contactdb"));
            return builder.Build();
        }
    }
}