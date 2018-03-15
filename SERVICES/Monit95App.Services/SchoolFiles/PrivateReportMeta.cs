using System;
using System.Collections.Generic;
using System.Linq;

using AutoMapper;

using Monit95App.Domain.Core.Entities;
using Monit95App.Infrastructure.Data;
using Monit95App.Services.Interfaces;
using Monit95App.Services.SchoolFiles;

namespace Monit95App.Services
{
    public class PrivateReportMeta : ITypeReport
    {
        private readonly Domain.Core.Entities.School school;
        private readonly ISchoolReportFileNameSource iFileNames;

        private CokoContext context = new CokoContext();
        public  PrivateReportMeta(Domain.Core.Entities.School school, ISchoolReportFileNameSource iFileNames)
        {
            this.school = school;
            this.iFileNames = iFileNames;
        }

        public IEnumerable<ReportModel> GetReportMetas()
        {
            //TODO: попробовать AutoMapper.EF6. Что это такое вообще?

            //настройка AutoMapper
            Mapper.Initialize(cfg => cfg.CreateMap<Report, ReportModel>());

            var reportFileNames = iFileNames.GetFileNames(school); //e.g: 0001_201664.zip
            Report report = null;            
            List<ReportModel> reportMetas = new List<ReportModel>();
            int currentReportCode = 0;
            foreach (var reportFileName in reportFileNames)
            {
                currentReportCode = Convert.ToInt32(reportFileName.Substring(5, 6));
                report = context.Reports.Where(x => x.Id == currentReportCode
                                                 && x.TypeCode == 1).Single();

                var newReportMeta = Mapper.Map<Report, ReportModel>(report);
                newReportMeta.Link = $@"{school.ReportLink}/{reportFileName}";
                newReportMeta.IsGot = report.SchoolReportsCollectors.SingleOrDefault(p => p.SchoolId == school.Id)?.IsGot ?? false;
                reportMetas.Add(newReportMeta);  
            }
            return reportMetas ?? Enumerable.Empty<ReportModel>();
        }
    }
}
