using Monit95App.Domain.Core;
using Monit95App.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services
{
    public class ProtectReportMeta : ITypeReport
    {
        private cokoContext context = new cokoContext();
        private School school;
        public ProtectReportMeta(School school)
        {
            this.school = school;
        }
        public IEnumerable<ReportMeta> GetReportMetas()
        {                     
            var new_protectReports = context.Reports.Where(x => x.TypeCode == 2).ToList();
            var new_protectReports2 = new_protectReports.Where(x => x.Available.Split(',').Contains(school.Id));

            ICollection<ReportMeta> reportMetas = new List<ReportMeta>();

            foreach (var protectReport in new_protectReports2)
            {
                reportMetas.Add(new ReportMeta
                {
                    Id = protectReport.Id,
                    Name = protectReport.Name,
                    ProjectName = protectReport.ProjectName,
                    Year = protectReport.Year,
                    Link = $@"https://cloud.mail.ru/public/2TP2/UAdxpfhuB/2000_{protectReport.Id}.rar"
                });
            }
            return reportMetas ?? Enumerable.Empty<ReportMeta>();
        }
    }
}
