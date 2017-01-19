using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Services.Work.Abstract;
using Moq;
using Monit95App.Domain.Core;
using Monit95App.Services.Work.Concrete;
using System.Collections;
using System.Linq;
using System.Collections.Generic;
using System.Data.Entity;

namespace Monit95App.Services.Work.Tests
{
    [TestClass]
    public class TestITypeReport
    {
        private string[] fileNames = new[] { "0024_201620.rar", "0024_201621.rar", "0024_201629.zip" };
        [TestMethod]
        public void TestGetReportMetasBySchool()
        {
            // Arrange
            var school = new School() { Id = "0024" };            
            var mockFileName = new Mock<ISchoolReportFileNameSource>();
            mockFileName.Setup(m => m.GetFileNames(It.IsAny<School>())).Returns(fileNames);

            var schoolReportMetas = ReportMetaHandler.GetReportMetasBySchool(school, mockFileName.Object).ToList();

            var data = new List<Report>
            {
                new Report
                {
                    Id = 201620,
                    Name = "Листы индивидуальных образовательных достижений (срез № 4)",
                    ProjectName = "«Я сдам ЕГЭ!»",
                    Year = "2015/2016",
                    TypeCode = 1
                },
                new Report
                {
                    Id = 201649,
                    Name = "Анализ результатов ЕГЭ-2016 по ЧР",
                    ProjectName = "ЕГЭ-2016",
                    Year = "2015/2016",
                    TypeCode = 3
                },
                 new Report
                {
                    Id = 201664,
                    Name = "Презентации по семинару от 05.01.2017",
                    ProjectName = "Аттестация руководителей ОО",
                    Year = "2016/2017",
                    Available = "0024,0048,0074,0079,0085,0098,0103,0127,0133,0140,0142,0145,0146,0188,0204,0215,0222,0252,0256,0262,0264,0274,0284,0293,0295,0296,0311,0321,0323,0327,0350,0358,0390,0435,0455,0457,0461,0466",
                    TypeCode = 2
                }
            }.AsQueryable();
            var mockSet = new Mock<DbSet<Report>>();
            mockSet.As<IQueryable<Report>>().Setup(m => m.Provider).Returns(data.Provider);
            mockSet.As<IQueryable<Report>>().Setup(m => m.Expression).Returns(data.Expression);
            mockSet.As<IQueryable<Report>>().Setup(m => m.ElementType).Returns(data.ElementType);
            mockSet.As<IQueryable<Report>>().Setup(m => m.GetEnumerator()).Returns(data.GetEnumerator);

            var mockContext = new Mock<cokoContext>();
            mockContext.Setup(m => m.Reports).Returns(mockSet.Object);

            // Act
            //var exist_private_report = schoolReportMetas.FindIndex(x => x.Id == 201620);
            //var exist_protect_report = schoolReportMetas.FindIndex(x => x.Id == 201664);
            //var exist_public_report = schoolReportMetas.FindIndex(x => x.Id == 201649);

            // Assert
            Assert.IsNotNull(schoolReportMetas);
            //Assert.IsTrue(exist_private_report >= 0);
            //Assert.IsTrue(exist_protect_report >= 0);
            //Assert.IsTrue(exist_public_report >= 0);
        }

        [TestMethod]
        public void TestGetPrivateReportMetas()
        {
            // Arrange                        
            var mockSchoolReportFileNames = new Mock<ISchoolReportFileNameSource>();            
            mockSchoolReportFileNames.Setup(foo => foo.GetFileNames(It.IsAny<School>())).Returns(fileNames);

            // Act
            PrivateReportMeta privateReportMeta = new PrivateReportMeta(new School(), mockSchoolReportFileNames.Object);
            var reportMetas = (ICollection)privateReportMeta.GetReportMetas();

            // Assert
            Assert.AreEqual(3, reportMetas.Count); 
                                                    
        }

        [TestMethod]
        public void TestGetProtectReportMetas()
        {
            // Arrange            
            School school = new School() { Id = "0048" };

            // Act
            var protectReportMeta = new ProtectReportMeta(school);
            var reportMetas = protectReportMeta.GetReportMetas().ToList();
            var bo = reportMetas.FindIndex(x => x.Id == 201664);

            // Assert
            Assert.IsTrue(bo >= 0);
        }

        [TestMethod]
        public void TestGetPublicReportMetas()
        {
            // Arrange            
            var existReports = new[] { 201650, 201653, 201654 };
            var publicReportMeta = new PublicReportMeta();
            
            // Act
            var reportMetas = publicReportMeta.GetReportMetas().ToList();
            var result = reportMetas.Where(x => existReports.Contains(x.Id)).ToList();

            // Assert
            Assert.AreEqual(3, result.Count());
        }
    }
}
