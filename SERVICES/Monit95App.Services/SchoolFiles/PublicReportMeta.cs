using Monit95App.Domain.Core;
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
    public class PublicReportMeta : ITypeReport
    {
        private CokoContext context = new CokoContext();
        private Domain.Core.Entities.School school;

        public PublicReportMeta(Domain.Core.Entities.School school)
        {
            this.school = school;
        }

        public IEnumerable<ReportModel> GetReportMetas()
        {
            //TODO: здесь дублирующий код с ProtectReportMeta и надо использовать Automapper
            var allReports = context.Reports.Where(x => x.TypeCode == 3).ToList();            

            ICollection<ReportModel> reportMetas = new List<ReportModel>();
            foreach (var report in allReports)
            {
                reportMetas.Add(new ReportModel
                {
                    Id = report.Id,
                    Name = report.Name,
                    ProjectName = report.ProjectName,
                    Year = report.Year,
                    Link = $@"https://cloud.mail.ru/public/2TP2/UAdxpfhuB/2000_{report.Id}.rar",
                    Date = report.Date,
                    IsGot = report.SchoolReportsCollectors.SingleOrDefault(p => p.SchoolId == school.Id)?.IsGot ?? false
                });
            }
            return reportMetas ?? Enumerable.Empty<ReportModel>();
        }
    }
}
