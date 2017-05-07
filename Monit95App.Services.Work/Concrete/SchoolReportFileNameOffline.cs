using Monit95App.Services.Work.Abstract;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Monit95App.Domain.Core;

namespace Monit95App.Services.Work.Concrete
{
    public class SchoolReportFileNameOffline : ISchoolReportFileNameSource
    {
        public IEnumerable<string> GetFileNames(School school)
        {
            var fileNames = Directory.GetFiles($@"\\192.168.88.254\Reports\{school.Id}")
                                     .Select(x => Path.GetFileName(x));            

            return fileNames;
        }
    }
}
