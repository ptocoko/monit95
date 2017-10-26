using Monit95App.Infrastructure.Data;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

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

            var egeQuestionValuesArray = entity.EgeQuestionValues.Split(';');


            return report;

        }

        public IEnumerable<ParticipReport> GetResultsByTestDate(int areaCode, DateTime testDate)
        {
            var results = context.RsurTestResults.Where(p => p.RsurParticipTest.RsurParticip.School.AreaCode == areaCode
                                                          && p.RsurParticipTest.RsurTest.TestDate >= testDate
                                                          && p.RsurQuestionValues.IndexOf("X") == -1).Include(s => s.RsurParticipTest.RsurParticip).Include(s => s.RsurParticipTest.RsurParticip.School).ToList()
                        .Select(s => new ParticipReport
                        {
                            Code = s.RsurParticipTest.RsurParticip.Code,
                            IsPassTest = s.Grade5 == 2 ? "незачет" : "зачет",
                            TestNameWithDate = s.RsurParticipTest.RsurTest.Test.Name + ", " + s.RsurParticipTest.RsurTest.TestDate.ToShortDateString(),
                            SchoolParticipInfo = new Domain.Core.SchoolParticip
                            {
                                Surname = s.RsurParticipTest.RsurParticip.Surname,
                                Name = s.RsurParticipTest.RsurParticip.Name,
                                SecondName = s.RsurParticipTest.RsurParticip.SecondName,
                                SchoolName = s.RsurParticipTest.RsurParticip.School.Id + " — " + s.RsurParticipTest.RsurParticip.School.Name.Trim()
                            }
                        });

            return results.OrderBy(tb => tb.SchoolParticipInfo.SchoolName).ThenBy(ob => ob.IsPassTest).ThenBy(tb => tb.SchoolParticipInfo.Surname).ThenBy(tb => tb.SchoolParticipInfo.Name);
        }
    }
}
