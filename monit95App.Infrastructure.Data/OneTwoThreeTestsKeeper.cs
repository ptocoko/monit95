using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Infrastructure.Data
{
    public enum OneTwoThreeTestAlias
    {
        All,
        RU,
        MA,
        CHT
    }

    public static class OneTwoThreeTestsKeeper
    {
        public static string[] GetTestIds(OneTwoThreeTestAlias alias)
        {
            if (alias == OneTwoThreeTestAlias.RU)
                return new string[] { "C0AAE792-9EE5-4A9F-B8CD-03AEF37032E1", "CCE3AB81-F9CC-4139-AF54-2A6E3E287D86", "BB55D9EE-4177-4FB9-B825-7BE22455B626" };
            else if (alias == OneTwoThreeTestAlias.MA)
                return new string[] { "6AD11617-1BCD-4DFF-886E-3CCAFE13C3F1", "14815A91-BB55-4030-9BF9-ECD1D8B2F99E", "5D16AC39-4FE0-4392-9612-7E256EA1BEBB" };
            else if (alias == OneTwoThreeTestAlias.CHT)
                return new string[] { "BD0B538F-A937-4BF7-8302-77A8B225D60D", "D6554110-E07A-4783-B371-04A46E32467B", "FDA1B01B-63AB-44A6-A976-D5B60E59BE5E" };
            else if (alias == OneTwoThreeTestAlias.All)
                return new string[] { "C0AAE792-9EE5-4A9F-B8CD-03AEF37032E1", "CCE3AB81-F9CC-4139-AF54-2A6E3E287D86", "BB55D9EE-4177-4FB9-B825-7BE22455B626", "6AD11617-1BCD-4DFF-886E-3CCAFE13C3F1", "14815A91-BB55-4030-9BF9-ECD1D8B2F99E", "5D16AC39-4FE0-4392-9612-7E256EA1BEBB", "BD0B538F-A937-4BF7-8302-77A8B225D60D", "D6554110-E07A-4783-B371-04A46E32467B", "FDA1B01B-63AB-44A6-A976-D5B60E59BE5E" };
            else
                throw new ArgumentException();
        }
    }
}
