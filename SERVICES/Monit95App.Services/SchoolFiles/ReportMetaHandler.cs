using System.Collections.Generic;
using System.Linq;
using Monit95App.Services.Interfaces;
using Monit95App.Infrastructure.Data;
using Monit95App.Services.SchoolFiles;

namespace Monit95App.Services
{
    public class ReportMetaHandler : IReportMetaHandler
    {
        private readonly CokoContext cokoDb;

        public ReportMetaHandler(CokoContext context)
        {
            cokoDb = context;
        }

        public IEnumerable<ReportModel> GetReportMetasBySchool(string schoolId, ISchoolReportFileNameSource iFileNames)
        {
            var school = cokoDb.Schools.Find(schoolId);

            ITypeReport privateReportMeta = new PrivateReportMeta(school, iFileNames);
            ITypeReport protectReportMeta = new ProtectReportMeta(school);
            ITypeReport publicReportMeta = new PublicReportMeta(school);
            //var p1 = privateReportMeta.GetReportMetas();
            //var p2 = protectReportMeta.GetReportMetas();
            //var p3 = publicReportMeta.GetReportMetas();
            //var p1p2 = p1.Concat(p2);
            var schoolReportMetas = privateReportMeta.GetReportMetas()
                                    .Concat(protectReportMeta.GetReportMetas())
                                    .Concat(publicReportMeta.GetReportMetas());
            return schoolReportMetas;
        }

        public void SetReportIsGot(int reportId, string schoolId)
        {
            var reportCollector = cokoDb.SchoolReportsCollectors.SingleOrDefault(p => p.ProjectId == reportId && p.SchoolId == schoolId);

            // если в таблице базы данных нет соответствующей записи, то создаем ее
            if (reportCollector == null)
            {
                cokoDb.SchoolReportsCollectors.Add(new Domain.Core.Entities.SchoolReportsCollector
                {
                    ProjectId = reportId,
                    SchoolId = schoolId,
                    IsGot = true
                });
            }
            else
            {
                cokoDb.SchoolReportsCollectors.Single(p => p.ProjectId == reportId && p.SchoolId == schoolId).IsGot = true;
            }

            cokoDb.SaveChanges();
        }
    }
}