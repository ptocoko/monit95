using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Services.Rsur.ParticipReport;
using System.Linq;
using Monit95App.Infrastructure.Data;

namespace Monit95App.Services.Tests
{
    [TestClass]
    public class RsurParticipReportService_Test
    {
        CokoContext context;

        [TestInitialize]
        public void Init()
        {
            context = new CokoContext();
        }

        [TestMethod]
        public void GetReport_Test()
        {
            var service = new ParticipReportService(context);
            var actual = service.GetReport(9540);

            var expectedIdPassTest = "зачет";
            var expectedValue = 100;

            Assert.AreEqual(expectedIdPassTest, actual.IsPassTest);
            Assert.AreEqual(expectedValue, actual.EgeQuestionResults.First().Value);
        }
    }
}
