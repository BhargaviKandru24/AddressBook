using AutoMapper;

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