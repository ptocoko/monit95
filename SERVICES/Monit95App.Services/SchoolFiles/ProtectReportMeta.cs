using Monit95App.Domain.Core;
using Monit95App.Domain.Core.Entities;
using Monit95App.Infrastructure.Data;
using Monit95App.Services.Interfaces;
using Monit95App.Services.SchoolFiles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services
{
    public class ProtectReportMeta : ITypeReport
    {
        private CokoContext context = new CokoContext();
        private Domain.Core.Entities.School school;

        public ProtectReportMeta(Domain.Core.Entities.School school)
        {
            this.school = school;
        }

        public IEnumerable<ReportModel> GetReportMetas()
        {                     
            var new_protectReports = context.Reports.Where(x => x.TypeCode == 2).ToList();
            var new_protectReports2 = new_protectReports.Where(x => x.Available.Split(',').Contains(school.Id));

            ICollection<ReportModel> reportMetas = new List<ReportModel>();

            foreach (var protectReport in new_protectReports2)
            {
                reportMetas.Add(new ReportModel
                {
                    Id = protectReport.Id,
                    Name = protectReport.Name,
                    ProjectName = protectReport.ProjectName,
                    Year = protectReport.Year,
                    Link = $@"https://cloud.mail.ru/public/2TP2/UAdxpfhuB/2000_{protectReport.Id}.rar",
                    Date = protectReport.Date,
                    IsGot = protectReport.SchoolReportsCollectors.SingleOrDefault(p => p.SchoolId == school.Id)?.IsGot ?? false
                });
            }
            return reportMetas ?? Enumerable.Empty<ReportModel>();
        }
    }
}
