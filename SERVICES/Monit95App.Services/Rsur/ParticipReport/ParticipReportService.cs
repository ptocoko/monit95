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

            report.Surname = entity.RsurParticipTest.RsurParticip.Surname;
            report.Name = entity.RsurParticipTest.RsurParticip.Name;
            report.SecondName = entity.RsurParticipTest.RsurParticip.SecondName;
            report.SchoolName = entity.RsurParticipTest.RsurParticip.School.Name;
        }
    }
}
