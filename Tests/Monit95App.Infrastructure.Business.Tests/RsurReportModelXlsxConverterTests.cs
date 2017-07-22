using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Infrastructure.Business;
using System.Collections.Generic;
using System.IO;
using Monit95App.Services;
using Monit95App.Services.Models.Rsur;
using ClosedXML.Excel;
using System.Linq;
using Monit95App.Domain.Core;

namespace Monit95App.Services.Tests
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
                    new RsurParticipFullInfo(new ProjectParticip())
                    {
                        AreaName = "Гудермес"
                    }
                }
            };

            //Act
            var stream = writer.Write(model);

            var templateBook = new XLWorkbook(stream);
            var templateSheet = templateBook.Worksheets.First();

            var c2Value = templateSheet.Cell("C2").Value.ToString();          

            //Assert
            Assert.IsNotNull(stream);
            Assert.AreEqual("Test", c2Value);
        }

        [TestMethod]
        public void GetStreamTest()
        {
            //Assert
            Assert.Fail();
        }
    }
}
