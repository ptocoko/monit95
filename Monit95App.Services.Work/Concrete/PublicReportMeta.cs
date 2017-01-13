﻿using Monit95App.Domain.Core;
using Monit95App.Services.Work.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.Work.Concrete
{
    public class PublicReportMeta : ITypeReport
    {
        private cokoContext context = new cokoContext();
        public IEnumerable<ReportMeta> GetReportMetas()
        {
            //TODO: здесь дублирующий код с ProtectReportMeta и надо использовать Automapper
            var allReports = context.Reports.Where(x => x.TypeCode == 3).ToList();            

            ICollection<ReportMeta> reportMetas = new List<ReportMeta>();
            foreach (var report in allReports)
            {
                reportMetas.Add(new ReportMeta
                {
                    Id = report.Id,
                    Name = report.Name,
                    ProjectName = report.ProjectName,
                    Year = report.Year,
                    Link = $@"https://cloud.mail.ru/public/2TP2/UAdxpfhuB/2000_{report.Id}.rar"
                });
            }
            return reportMetas ?? Enumerable.Empty<ReportMeta>();
        }
    }
}
