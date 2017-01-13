using Monit95App.Domain.Core;
using Monit95App.Services.Work.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.Work.Concrete
{
    public class PrivateReportMeta : ITypeReport
    {
        private readonly School school;
        private readonly ISchoolReportFileNameSource iFileNames;

        private cokoContext context = new cokoContext();
        public PrivateReportMeta(School school, ISchoolReportFileNameSource iFileNames)
        {
            this.school = school;
            this.iFileNames = iFileNames;
        }
        public IEnumerable<ReportMeta> GetReportMetas()
        {
            var reportFileNames = iFileNames.GetFileNames(school); //e.g: 0001_201664.zip
            Report report = null;            
            List<ReportMeta> reportMetas = new List<ReportMeta>();
            int currentReportCode = 0;
            foreach (var reportFileName in reportFileNames)
            {
                currentReportCode = Convert.ToInt32(reportFileName.Substring(5, 6));
                report = context.Reports.Where(x => x.Id == currentReportCode
                                                 && x.TypeCode == 1).Single();                                                 
                reportMetas.Add(new ReportMeta
                {
                    Id = report.Id,
                    Name = report.Name,
                    ProjectName = report.ProjectName,
                    Year = report.Year,
                    Link = $@"{school.ReportLink}/{reportFileName}"
                });
            }
            return reportMetas ?? Enumerable.Empty<ReportMeta>();
        }
    }
}
