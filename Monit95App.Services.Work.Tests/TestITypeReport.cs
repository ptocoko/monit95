﻿using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Services.Work.Abstract;
using Moq;
using Monit95App.Domain.Core;
using Monit95App.Services.Work.Concrete;
using System.Collections;
using System.Linq;

namespace Monit95App.Services.Work.Tests
{
    [TestClass]
    public class TestITypeReport
    {
        [TestMethod]
        public void TestGetPrivateReportMetas()
        {
            // Arrange            
            var fileNames = new[] { "0001_201657", "0001_201658" };            
            var mockSchoolReportFileNames = new Mock<ISchoolReportFileNameSource>();            
            mockSchoolReportFileNames.Setup(foo => foo.GetFileNames(It.IsAny<School>())).Returns(fileNames);

            // Act
            PrivateReportMeta privateReportMeta = new PrivateReportMeta(new School(), mockSchoolReportFileNames.Object);
            var reportMetas = (ICollection)privateReportMeta.GetReportMetas();

            // Assert
            Assert.AreEqual(2, reportMetas.Count);                                         
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
