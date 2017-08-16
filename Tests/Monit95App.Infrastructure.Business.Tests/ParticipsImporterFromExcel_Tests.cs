using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Domain.Core;
using Monit95App.Services;
using Monit95App.Services.Interfaces;
using NSubstitute;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Infrastructure.BusinessTests
{
    [TestClass]
    public class ParticipsImporterFromExcel_Tests
    {
        string _pathToMockExcel = @"D:\Work\mock_excel.xlsx";
        ParticipsImporterFromExcel importer;
        IClassService mockClassService;

        public ParticipsImporterFromExcel_Tests()
        {
            mockClassService = Substitute.For<IClassService>();
        }

        [TestMethod]
        public void GetParticipsFromPath_Test()
        {
            var mockClasses = new List<Class>
            {
                new Class
                {
                    Name = "1А",
                    Id = "0101"
                },
                new Class
                {
                    Name = "1Б",
                    Id = "0102"
                }
            };
            mockClassService.GetAll().Returns(mockClasses);
            importer = new ParticipsImporterFromExcel(mockClassService);

            var actual = importer.GetParticipsFromExcelPath(_pathToMockExcel);

            Assert.IsNotNull(actual);
            Assert.AreEqual("0102", actual[1].ClassCode);
            Assert.AreEqual("Хусайн", actual[0].Name, true);
        }
    }
}
