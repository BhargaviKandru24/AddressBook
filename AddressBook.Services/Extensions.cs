using System;
using System.Collections.Generic;
using Contactdb;

namespace AddressBook.Services
{
    public static class Extensions
    {
        public static void AuditFieldsOnCreate<T>(this ContactdbDB.Record<T> record) where T : new()
        {
            dynamic tableRecord = (dynamic)record;
            tableRecord.CreatedDate = DateTime.Now;
            tableRecord.CreatedBy = "Bhargavi";
            tableRecord.ModifiedBy = "Bhargavi";
            tableRecord.ModifiedDate = DateTime.Now;
        }

        public static IList<TDestination> MapList<TSource, TDestination>(List<TSource> contacts)
        {
            return ConfigurationServices.mapper.Map<IList<TSource>, IList<TDestination>>(contacts);
        }
    }
}