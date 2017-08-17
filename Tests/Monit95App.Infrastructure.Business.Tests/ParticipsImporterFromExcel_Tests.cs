using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Domain.Core;
using Monit95App.Services;
using Monit95App.Services.Interfaces;
using NSubstitute;
using System;
using System.Collections.Generic;
using System.IO;
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
        //[ExpectedException(typeof(FileFormatException))]
        public void GetParticipsFromPath_TestWhenFileHasErrors()
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

            var actual = importer.GetParticipsFromExcelStream(_pathToMockExcel);
            
            Assert.AreEqual(2, actual.Count);
            //Assert.AreNotEqual(string.Empty, actual[1].SecondName);
            Assert.AreEqual("0102", actual[0].ClassCode);
            Assert.AreEqual(true, importer.HasRowsWithErrors);
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

            var actual = importer.GetParticipsFromExcelStream(_pathToMockExcel);

            Assert.AreEqual(3, actual.Count);
            Assert.AreEqual(string.Empty, actual[1].SecondName);
            Assert.AreEqual("0102", actual[0].ClassCode);
            Assert.AreEqual(false, importer.HasRowsWithErrors);
        }
    }
}
