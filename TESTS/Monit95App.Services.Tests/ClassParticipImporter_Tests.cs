using System.Collections.Generic;
using System.Reflection;

using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Services.Interfaces;

using NSubstitute;
using System.Linq;
using Monit95App.Domain.Core.Entities;

namespace Monit95App.Services.Tests
{
    [TestClass]
    public class ClassParticipImporter_Tests
    {
        private ClassParticipImporter importer;

        private readonly IClassService mockClassService;

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
                    Name = "1 ",
                    Id = "0100"
                },
                new Class
                {
                    Name = "1 А",
                    Id = "0101"
                },
                new Class
                {
                    Name = "1 Б",
                    Id = "0101"
                },
                new Class
                {
                    Name = "11 Б",
                    Id = "1102"
                }
            };
            mockClassService.GetAll().Returns(mockClasses);
            importer = new ClassParticipImporter(mockClassService);

            var assembly = Assembly.GetAssembly(importer.GetType());
            var (actualParticips, actualRowNumbersWithErrors) = importer
                                .ImportFromExcelFileStream(assembly.GetManifestResourceStream("Monit95App.Services.Resource.mock-particips.xlsx"), new List<int> { 1, 11 });

            Assert.AreEqual(1, actualRowNumbersWithErrors.Count());
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
                    Name = "11 Б",
                    Id = "1101"
                },
                new Class
                {
                    Name = "1 А",
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
            Assert.AreEqual(2, actualParticips[1].Birthday.Value.Month);
        }
    }
}
