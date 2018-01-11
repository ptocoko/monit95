using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Web;
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
            mockFileService.Add(Arg.Any<int>(), Arg.Any<Stream>(), "protocol.jpg", Arg.Any<string>()).Returns(1);
            mockFileService.Add(Arg.Any<int>(), Arg.Any<Stream>(), "foto1.jpg", Arg.Any<string>()).Returns(2);
            mockFileService.Add(Arg.Any<int>(), Arg.Any<Stream>(), "foto2.jpg", Arg.Any<string>()).Returns(3);                        

            var fakeUniqueStreamDictionary = new Dictionary<string, UniqueStream>
            {
                { "protocol", new UniqueStream { FileName =  "protocol.jpg", Stream = new MemoryStream(10) } },
                { "foto1", new UniqueStream { FileName =  "foto1.jpg", Stream = new MemoryStream(10) } },
                { "foto2", new UniqueStream { FileName =  "foto2.jpg", Stream = new MemoryStream(10) } },
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
            var result = seminarReportService.CreateReport(fakeUniqueStreamDictionary, "0001");

            // Assert
            Assert.IsTrue(!result.Errors.Any());
        }

        [TestMethod]
        public void GetReportTest()
        {
            // ARRANGE
            // mocking RsurReportFileSet
            var fakeRsurReportFiles = new List<RsurReportFile>
            {
                new RsurReportFile
                {
                    RsurReportId = 1,
                    IsProtocol = false,
                    FileId = 1,
                    File = new Domain.Core.Entities.File
                    {                        
                        FilePermissonList = new List<FilePermission>
                        {
                            new FilePermission
                            {
                                UserName = "0001",
                                PermissionId = 1 // read
                            }                            
                        }
                    }
                },
                new RsurReportFile
                {
                    RsurReportId = 1,
                    IsProtocol = false,
                    FileId = 2,
                    File = new Domain.Core.Entities.File
                    {                        
                        FilePermissonList = new List<FilePermission>
                        {
                            new FilePermission
                            {
                                UserName = "0001",
                                PermissionId = 1 // read
                            }
                        }
                    }
                },
                 new RsurReportFile
                {
                    RsurReportId = 1,
                    IsProtocol = true, //protocol
                    FileId = 3,
                    File = new Domain.Core.Entities.File
                    {                        
                        FilePermissonList = new List<FilePermission>
                        {
                            new FilePermission
                            {
                                UserName = "0001",
                                PermissionId = 1 // read
                            }
                        }
                    }
                }

            };
            var mockRsurReportFileSet = MockDbSet.GetMock(fakeRsurReportFiles);            

            // mocking CokoContext
            var mockCokoContext = Substitute.For<CokoContext>();
            mockCokoContext.RsurReportFiles.Returns(mockRsurReportFileSet);

            // mocking IFileService            
            var mockFileService = Substitute.For<IFileService>();
            mockFileService.GetFileBase64String(1, "0001").Returns("foto1Base64String");
            mockFileService.GetFileBase64String(2, "0001").Returns("foto2Base64String");
            mockFileService.GetFileBase64String(3, "0001").Returns("protocolBase64String");

            // ACT
            var seminarReportService = new SeminarReportService(mockCokoContext, mockFileService);            
            var result = seminarReportService.GetReport(1, "0001");

            // ASSERT
            Assert.IsNotNull(result.Count >= 3 && result.Count <= 5);
            Assert.AreEqual(result["protocol"], "protocolBase64String");
        }
    }
}
