using System;
using System.Collections.Generic;
using System.Linq;
using ClosedXML.Excel;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Services;
using Monit95App.Services.Rsur;

namespace Monit95App.Services.Tests
{
    [TestClass]
    public class RsurReportModelXlsxConverterTests
    { 
        [TestMethod]
        public void Write_Test()
        {
            ////Arrange
            //var writer = new RsurReportModelXlsxConverter();
            //var model = new RsurReportModel
            //{
            //    ReportCreatedDate = DateTime.Now,
            //    ReportName = "Test",
            //    RsurParticipFullInfos = new List<RsurParticipFullInfo>
            //    {
            //        new RsurParticipFullInfo()
            //        {
            //            AreaName = "Гудермес"
            //        }
            //    }
            //};

            ////Act
            //var stream = writer.Write(model);

            //var templateBook = new XLWorkbook(stream);
            //var templateSheet = templateBook.Worksheets.First();

            //var c2Value = templateSheet.Cell("C2").Value.ToString();          

            ////Assert
            //Assert.IsNotNull(stream);
            //Assert.AreEqual("Test", c2Value);
        }    
    }
}
