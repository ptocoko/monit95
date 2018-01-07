using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Domain.Core.Entities;
using Monit95App.Infrastructure.Data;
using Monit95App.Services.File;
using Monit95App.Services.Rsur.SeminarReport;
using Monit95App.Services.Tests.Util;
using NSubstitute;
using ServiceResult;

namespace Monit95App.Services.Tests
{
    [TestClass]
    public class SeminarReportServiceTest
    {
        [TestMethod]
        public void CreateReportTest()
        {
            // Arrange
            var cokoContext = new CokoContext();
            
            // mocking IFileService
            var mockFileService = Substitute.For<IFileService>();
            
            var protocolStream = new MemoryStream(); // > 15Mb
            var foto1Stream = new MemoryStream();
            var foto2Stream = new MemoryStream();

            mockFileService.Add(Arg.Any<int>(), protocolStream, Arg.Any<string>()).Returns(new ServiceResult<int> { Result = 1 });
            mockFileService.Add(Arg.Any<int>(), foto1Stream, Arg.Any<string>()).Returns(new ServiceResult<int> { Result = 2 });
            mockFileService.Add(Arg.Any<int>(), foto2Stream, Arg.Any<string>()).Returns(new ServiceResult<int> { Result = 3 });

            var fakeInputStreamDictionary = new Dictionary<string, Stream>
            {
                { "protocol", protocolStream },
                { "foto1", foto1Stream },
                { "foto2", foto2Stream }
            };               
                    
            var fakeSchools = new List<Domain.Core.Entities.School>
            {
                new Domain.Core.Entities.School{Id = "0001"}
            };
            var mockSchoolSet = MockDbSet.GetMock(fakeSchools);

            var fakeRsurReports = new List<RsurReport>();
            var mockRsurReportSet = MockDbSet.GetMock(fakeRsurReports);

            var mockCokoContext = Substitute.For<CokoContext>();            
            mockCokoContext.Schools.Returns(mockSchoolSet);
            mockCokoContext.RsurReports.Returns(mockRsurReportSet);

            // Act
            var seminarReportService = new SeminarReportService(mockCokoContext, mockFileService);
            var result = seminarReportService.CreateReport(fakeInputStreamDictionary, "0001");

            // Assert
            Assert.IsTrue(!result.Errors.Any());
        }
    }
}
