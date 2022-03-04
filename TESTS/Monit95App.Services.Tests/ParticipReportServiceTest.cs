using System;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Infrastructure.Data;
using Monit95App.Services.Rsur.ParticipReport;

namespace Monit95App.Services.Tests
{
    [TestClass]
    public class ParticipReportServiceTest
    {        
        [TestMethod]        
        public void GetReportTest()
        {
            // Arrange
            var context = new CokoContext();            
            var service = new ParticipReportService(context);            

            // Act
            var report = service.GetExtendReport(9110);
            var reportEgeQuestion9Result = report.Result.EgeQuestionResults.Single(x => x.EgeQuestionNumber == 9);

            // Assert
            Assert.AreEqual(7, report.Result.EgeQuestionResults.Count());

            Assert.AreEqual("Правописание приставок", reportEgeQuestion9Result.ElementNames);
            Assert.AreEqual("9.1;9.2;9.3", reportEgeQuestion9Result.RsurQuestionNumbers);
            Assert.AreEqual(100, reportEgeQuestion9Result.Value);
        }

        [TestMethod]
        public void GetReport10748Test()
        {
            // Arrange
            var context = new CokoContext();
            var service = new ParticipReportService(context);

            // Act
            var report = service.GetExtendReport(10748);
            //var reportEgeQuestion9Result = report.EgeQuestionResults.Single(x => x.EgeQuestionNumber == 9);

            // Assert
        }

        //[TestMethod]
        //[ExpectedException(typeof(ArgumentException))]
        //public void GetReportTestValidateTest()
        //{
        //    // Arrange
        //    var context = new CokoContext();
        //    var service = new ParticipReportService(context);

        //    // Act
        //    var report = service.GetReport(2625); // результат участника по «РСУР. Орфография (старая модель)»

        //    // Assert
        //}
    }
}
