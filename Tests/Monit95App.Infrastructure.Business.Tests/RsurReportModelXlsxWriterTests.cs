using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Infrastructure.Business;
using Monit95App.Infrastructure.Business.Models.Rsur;
using System.Collections.Generic;
using System.IO;

namespace Monit95App.Infrastructure.BusinessTests
{
    [TestClass]
    public class RsurReportModelXlsxWriterTests
    {
        [TestMethod]
        public void WriteTest()
        {
            //Arrange
            var writer = new RsurReportModelXlsxWriter();
            var model = new RsurReportModel
            {
                ReportCreatedDate = DateTime.Now,
                ReportName = "Test",
                RsurParticipFullInfos = new List<RsurParticipFullInfo>
                {
                    new RsurParticipFullInfo()
                    {
                        AreaName = "Гудермес"
                    }
                }
            };

            //Act
            var stream = writer.Write(model);
            byte[] bytes = new byte [stream.Length];
            stream.Read(bytes, 0, bytes.Length);
            File.WriteAllBytes(@"d:\test.xlsx", bytes);
            stream.Dispose();

            //Assert
            Assert.Fail();
        }
    }
}
