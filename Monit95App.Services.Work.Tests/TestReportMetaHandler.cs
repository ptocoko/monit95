using System;
using System.Text;
using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Domain.Core;
using Monit95App.Services.Work.Concrete;
using System.Linq;
using Moq;
using System.Data.Entity;

namespace Monit95App.Services.Work.Tests
{
    /// <summary>
    /// Сводное описание для TestReportMetaHandler
    /// </summary>
    [TestClass]
    public class TestReportMetaHandler
    {
        cokoContext context = new cokoContext();
        public TestReportMetaHandler()
        {
            //
            // TODO: добавьте здесь логику конструктора
            //
        }

        private TestContext testContextInstance;

        /// <summary>
        ///Получает или устанавливает контекст теста, в котором предоставляются
        ///сведения о текущем тестовом запуске и обеспечивается его функциональность.
        ///</summary>
        public TestContext TestContext
        {
            get
            {
                return testContextInstance;
            }
            set
            {
                testContextInstance = value;
            }
        }

        #region Дополнительные атрибуты тестирования
        //
        // При написании тестов можно использовать следующие дополнительные атрибуты:
        //
        // ClassInitialize используется для выполнения кода до запуска первого теста в классе
        // [ClassInitialize()]
        // public static void MyClassInitialize(TestContext testContext) { }
        //
        // ClassCleanup используется для выполнения кода после завершения работы всех тестов в классе
        // [ClassCleanup()]
        // public static void MyClassCleanup() { }
        //
        // TestInitialize используется для выполнения кода перед запуском каждого теста 
        // [TestInitialize()]
        // public void MyTestInitialize() { }
        //
        // TestCleanup используется для выполнения кода после завершения каждого теста
        // [TestCleanup()]
        // public void MyTestCleanup() { }
        //
        #endregion

        [TestMethod]
        public void TestGetReportMetasBySchool()
        {
            // Arrange
            var school = new School() { Id = "0024" };
            var schoolReportMetas = ReportMetaHandler.GetReportMetasBySchool(school).ToList();

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
    }
}
