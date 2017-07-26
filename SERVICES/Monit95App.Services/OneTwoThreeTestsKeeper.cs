using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services
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
        private static string[] ru = new string[] { "C0AAE792-9EE5-4A9F-B8CD-03AEF37032E1", "CCE3AB81-F9CC-4139-AF54-2A6E3E287D86", "BB55D9EE-4177-4FB9-B825-7BE22455B626" };
        private static string[] ma = new string[] { "6AD11617-1BCD-4DFF-886E-3CCAFE13C3F1", "14815A91-BB55-4030-9BF9-ECD1D8B2F99E", "5D16AC39-4FE0-4392-9612-7E256EA1BEBB" };
        private static string[] cht = new string[] { "BD0B538F-A937-4BF7-8302-77A8B225D60D", "D6554110-E07A-4783-B371-04A46E32467B", "FDA1B01B-63AB-44A6-A976-D5B60E59BE5E" };
        private static string[] all = new string[] { "C0AAE792-9EE5-4A9F-B8CD-03AEF37032E1", "CCE3AB81-F9CC-4139-AF54-2A6E3E287D86", "BB55D9EE-4177-4FB9-B825-7BE22455B626", "6AD11617-1BCD-4DFF-886E-3CCAFE13C3F1", "14815A91-BB55-4030-9BF9-ECD1D8B2F99E", "5D16AC39-4FE0-4392-9612-7E256EA1BEBB", "BD0B538F-A937-4BF7-8302-77A8B225D60D", "D6554110-E07A-4783-B371-04A46E32467B", "FDA1B01B-63AB-44A6-A976-D5B60E59BE5E" };

        public static string[] GetTestIds(OneTwoThreeTestAlias alias)
        {
            if (alias == OneTwoThreeTestAlias.RU)
                return ru;
            else if (alias == OneTwoThreeTestAlias.MA)
                return ma;
            else if (alias == OneTwoThreeTestAlias.CHT)
                return cht;
            else if (alias == OneTwoThreeTestAlias.All)
                return cht;
            else
                throw new ArgumentException();
        }

        public static string GetSubjectName(string testId)
        {
            if (ru.Contains(testId))
                return "Русский язык";
            else if (ma.Contains(testId))
                return "Математика";
            else if (cht.Contains(testId))
                return "Чтение";
            else
                throw new ArgumentException();
        }
    }
}
