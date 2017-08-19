using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Domain.Core;
using Monit95App.Services;
using Monit95App.Services.Interfaces;
using NSubstitute;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Infrastructure.BusinessTests
{
    [TestClass]
    public class ParticipsImporterFromExcel_Tests
    {
        string _pathToMockExcel = @"D:\Work\mock_excel.xlsx";
        ExcelParticipImporter importer;
        IClassService mockClassService;

        public ParticipsImporterFromExcel_Tests()
        {
            mockClassService = Substitute.For<IClassService>();
        }

        [TestMethod]        
        public void GetParticipsFromExcelStream_TestWhenFileHasErrors()
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
            importer = new ExcelParticipImporter(mockClassService);

            var assembly = Assembly.GetExecutingAssembly();
            var actual = importer.GetFromStream(assembly.GetManifestResourceStream("Monit95App.Services.Resource.particip-list.xlsx"));
            
            Assert.AreEqual(2, actual.Count);
            Assert.AreEqual("0102", actual[0].ClassCode);
            Assert.AreEqual(true, importer.HasRowsWithErrors);
            Assert.AreEqual(4, importer.RowsWithErrors.First().Key.RowNumber);
        }

        [TestMethod]
        public void GetParticipsFromXlsxFileStream_Test()
        {
            var mockClasses = new List<Class>
            {
                new Class
                {
                    Name = "1",
                    Id = "0100"
                },
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
            importer = new ExcelParticipImporter(mockClassService);

            var assembly = Assembly.GetAssembly(importer.GetType());
            var actual = importer.GetFromStream(assembly.GetManifestResourceStream("Monit95App.Services.Resource.mock-particips.xlsx"));

            Assert.AreEqual(3, actual.Count);
            Assert.AreEqual("Хусайн", actual[1].Name, false);
            Assert.AreEqual("0100", actual[2].ClassCode);
            Assert.AreEqual(false, importer.HasRowsWithErrors);
        }
    }
}
