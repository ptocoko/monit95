using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Infrastructure.Business;
using System.Collections.Generic;
using System.IO;
using Monit95App.Services;
using Monit95App.Services.Models.Rsur;

namespace Monit95App.Infrastructure.BusinessTests
{
    [TestClass]
    public class RsurReportModelXlsxConverterTests
    {
        [TestMethod]
        public void CreateTest()
        {
            //Assert
            Assert.Fail();
        }      

        [TestMethod]
        public void WriteTest()
        {
            //Arrange
            var writer = new RsurReportModelXlsxConverter();
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

        [TestMethod]
        public void GetStreamTest()
        {
            //Assert
            Assert.Fail();
        }
    }
}
