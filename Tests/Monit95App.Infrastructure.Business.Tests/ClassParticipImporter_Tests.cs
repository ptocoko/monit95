    using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Domain.Core;
using Monit95App.Domain.Core.Entities;
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
    public class ClassParticipImporter_Tests
    {
        ClassParticipImporter importer;
        IClassService mockClassService;

        public ClassParticipImporter_Tests()
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
            importer = new ClassParticipImporter(mockClassService);

            var assembly = Assembly.GetAssembly(importer.GetType());
            var (actualParticips, actualRowNumbersWithErrors) = importer
                                .ImportFromExcelFileStream(assembly.GetManifestResourceStream("Monit95App.Services.Resource.mock-particips.xlsx"));
            
            Assert.AreEqual(2, actualParticips.Count);
            Assert.AreEqual("1Б", actualParticips[0].ClassName);
            Assert.AreEqual(4, actualRowNumbersWithErrors.First());
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
            importer = new ClassParticipImporter(mockClassService);

            var assembly = Assembly.GetAssembly(importer.GetType());
            var (actualParticips, actualRowNumbersWithErrors) = importer
                                .ImportFromExcelFileStream(assembly.GetManifestResourceStream("Monit95App.Services.Resource.mock-particips.xlsx"));

            Assert.AreEqual(3, actualParticips.Count);
            Assert.AreEqual("Хусайн", actualParticips[1].Name, false);
            Assert.AreEqual("1", actualParticips[2].ClassName);
            Assert.AreEqual(true, actualRowNumbersWithErrors == null);
        }
    }
}
