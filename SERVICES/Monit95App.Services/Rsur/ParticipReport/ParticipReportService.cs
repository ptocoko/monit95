using Monit95App.Infrastructure.Data;
using System;

namespace Monit95App.Services.Rsur.ParticipReport
{
    public class ParticipReportService : IParticipReportService
    {
        #region Dependencies

        private readonly CokoContext context;

        #endregion

        public ParticipReportService(CokoContext context)
        {
            this.context = context;
        }

        public ParticipExtendReport GetReport(int rsurParticipTestId)
        {
            var report = new ParticipExtendReport();

            var entity = context.RsurTestResults.Find(rsurParticipTestId);
            _ = entity ?? throw new ArgumentNullException(nameof(rsurParticipTestId));

            report.SchoolParticipInfo.Surname = entity.RsurParticipTest.RsurParticip.Surname;
            report.SchoolParticipInfo.Name = entity.RsurParticipTest.RsurParticip.Name;
            report.SchoolParticipInfo.SecondName = entity.RsurParticipTest.RsurParticip.SecondName;
            report.SchoolParticipInfo.SchoolName = entity.RsurParticipTest.RsurParticip.School.Name;
            report.Code = entity.RsurParticipTest.RsurParticipCode;
            report.IsPassTest = entity.Grade5 == 5 ? "зачет" : "незачет";
            report.TestDate = entity.RsurParticipTest.RsurTest.TestDate;
            report.TestName = $"{entity.RsurParticipTest.RsurTest.Test.NumberCode}" +
                              $" - {entity.RsurParticipTest.RsurTest.Test.Name}";

            return report;

        }
    }
}
