using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AutoMapper;
using AddressBook.Models;
using Contactdb;

namespace AddressBook.Services
{
    public static class ConfigurationServices
    {
        public static MapperConfiguration configuration = new MapperConfiguration(cfg =>
        {
            cfg.CreateMap<Models.Contact, Contactdb.Contact > ();
        });

        public static IMapper mapper = configuration.CreateMapper();
    }
}