using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using monit95App.Domain.Core;
using monit95App.Domain.Interfaces;
using monit95App.Infrastructure.Data;
using System.Collections.Generic;
using Moq;
using System.Data.Entity;
using System.Linq;


namespace TestReport
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void TestGetReportListForSchool()
        {
            //Организация
            var reports = new List<Report>
            {
                new Report {path=@"\\192.168.88.220\Install\БАНК ОТЧЕТОВ АИС МОР\«Я сдам ЕГЭ!»\Срез № 2"  },
                new Report {path=@"\\192.168.88.220\Install\БАНК ОТЧЕТОВ АИС МОР\«Я сдам ЕГЭ!»\Срез № 3"  }                
            }.AsQueryable();

            var mockSet = new Mock<DbSet<Report>>();
            mockSet.As<IQueryable<Report>>().Setup(m => m.Provider).Returns(reports.Provider);
            mockSet.As<IQueryable<Report>>().Setup(m => m.Expression).Returns(reports.Expression);
            mockSet.As<IQueryable<Report>>().Setup(m => m.ElementType).Returns(reports.ElementType);
            mockSet.As<IQueryable<Report>>().Setup(m => m.GetEnumerator()).Returns(reports.GetEnumerator());

            var mockMonit95Context = new Mock<monit95Context>();
            mockMonit95Context.Setup(x => x.Reports).Returns(mockSet.Object);
            IReportRepository reportRepository = new ReportRepository(mockMonit95Context.Object);

            area _area = new area()
            {
                AreaName = "г. Грозный"
            };
            school _school = new school() //создаю школу
            {
                SchoolID = "0286",
                AreaID = 205,
                area = _area
            };

            //Действие
            var reportList = reportRepository.GetReportListForSchool(_school);
           
            Assert.AreEqual(2, reportList.Count);        

            //Утверждение
            //Assert.AreEqual(2, reportList.Count);
            // Assert.AreEqual("0286", _school.SchoolID);


        }
    }
}
