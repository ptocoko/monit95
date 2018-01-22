using System.Collections.Generic;
using System.IO;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Domain.Core.Entities;
using Monit95App.Infrastructure.Data;
using Monit95App.Services.File;
using Monit95App.Services.Rsur.SeminarReport;
using Monit95App.Services.Tests.Util;
using NSubstitute;

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
            
            // mocking FileService
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
                    
            // mocking School set
            var fakeSchools = new List<Domain.Core.Entities.School>
            {
                new Domain.Core.Entities.School { Id = "0001", AreaCode = 205 }
            };
            var mockSchoolSet = MockDbSet.GetMock(fakeSchools);
            mockSchoolSet.Find("0001").Returns(new Domain.Core.Entities.School { AreaCode = 205 });
            //mockDbSet.Setup(x => x.Find(It.IsAny<object[]>())).Returns<object[]>(x => (sourceList as List<MyFirstSet>)
            //.FirstOrDefault(y => y.MyFirstSetKey == (Guid)x[0]) as T);

            // mocking RsurReport set
            var fakeRsurReports = new List<RsurReport>();
            var mockRsurReportSet = MockDbSet.GetMock(fakeRsurReports);

            // mocking CokoContext
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
        public void DeleteReportTest()
        {
            Assert.Fail();
        }

        [TestMethod]
        public void GetEditDtoTest()
        {
            // ARRANGE
            // mocking RsurReportFile set
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

            // mocking RsurReport set
            var fakeRsurReports = new List<RsurReport>();
            var mockRsurReportSet = MockDbSet.GetMock(fakeRsurReports);
            mockRsurReportSet.Find(1).Returns(new RsurReport {
                RsurReportFiles = fakeRsurReportFiles,
                Date = new System.DateTime(2018, 1, 15),
                SchoolId = "0001",
                School = new Domain.Core.Entities.School
                {
                    Name = "Школа №1"
                }
            });

            // mocking CokoContext
            var mockCokoContext = Substitute.For<CokoContext>();
            mockCokoContext.RsurReportFiles.Returns(mockRsurReportFileSet);
            mockCokoContext.RsurReports.Returns(mockRsurReportSet);

            // mocking FileService            
            var mockFileService = Substitute.For<IFileService>();
            mockFileService.GetFileBase64String(1, "0001").Returns("foto1Base64String");
            mockFileService.GetFileBase64String(2, "0001").Returns("foto2Base64String");
            mockFileService.GetFileBase64String(3, "0001").Returns("protocolBase64String");

            // ACT
            var seminarReportService = new SeminarReportService(mockCokoContext, mockFileService);
            var result = seminarReportService.GetEditDto(1, "0001");

            // ASSERT
            Assert.IsNotNull(result.SeminarFiles.Count >= 3 && result.SeminarFiles.Count <= 5);
            Assert.AreEqual(result.SeminarFiles["protocol"], "protocolBase64String");
            Assert.AreEqual("0001 - Школа №1", result.SeminarReportViewDto.SchoolName);
        }

        [TestMethod]
        public void GetViewDtos()
        {
            // ARRANGE
            // mocking RsurReport set
            var fakeRsurReports = new List<RsurReport>
            {
                new RsurReport
                {
                    School = new Domain.Core.Entities.School
                    {
                        AreaCode = 201,
                        Name = "Школа №1"
                    },
                    Id = 1,
                    Date = new System.DateTime(2018, 1, 10),
                    SchoolId = "0001"                  
                },
                new RsurReport
                {
                    School = new Domain.Core.Entities.School
                    {
                        AreaCode = 201,
                        Name = "Школа №1"
                    },
                    Id = 2,
                    Date = new System.DateTime(2018, 1, 11),
                    SchoolId = "0001"
                },
                new RsurReport
                {
                    School = new Domain.Core.Entities.School
                    {
                        AreaCode = 202,
                        Name = "Школа №1"
                    },
                    Id = 3,
                    Date = new System.DateTime(2018, 1, 12),
                    SchoolId = "0002"
                }
            };
            var mockRsurReportSet = MockDbSet.GetMock(fakeRsurReports);

            // mocking CokoContext
            var mockCokoContext = Substitute.For<CokoContext>();
            mockCokoContext.RsurReports.Returns(mockRsurReportSet);

            // ACT
            var seminarService = new SeminarReportService(mockCokoContext, Substitute.For<IFileService>());
            var seminarReportViewDtosSchool0001 = seminarService.GetViewDtos("0001");
            var seminarReportViewDtosArea202 = seminarService.GetViewDtos("202");

            // ASSERT
            Assert.AreEqual("0001 - Школа №1", seminarReportViewDtosSchool0001.First().SchoolName);
            Assert.AreEqual("0002 - Школа №1", seminarReportViewDtosArea202.First().SchoolName);
        }
    }
}
