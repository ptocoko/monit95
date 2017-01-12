using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Models;
using System.Collections.Generic;
using System.Linq;
using System.IO.Abstractions.TestingHelpers; //
using Moq;
using Monit95App.Models.Abstarct;
using Monit95App.Domain.Core;

namespace Monit95App.Web.Tests
{
    [TestClass]
    public class TestCollector
    {
        [TestMethod]
        public void TestUpdateCollectorSchools()
        {
            // Arrange
            var mockDbContext = EntityFrameworkMockHelper.GetMockContext<cokoContext>();
            mockDbContext.Object.CollectorSchools.Add(new CollectorSchool { CollectorId = 201650, SchoolId = "0001", StatusCode = 0 });
            mockDbContext.Object.CollectorSchools.Add(new CollectorSchool { CollectorId = 201650, SchoolId = "0002", StatusCode = 0 });
            mockDbContext.Object.CollectorSchools.Add(new CollectorSchool { CollectorId = 201650, SchoolId = "0005", StatusCode = 0 });
            mockDbContext.Object.CollectorSchools.Add(new CollectorSchool { CollectorId = 201650, SchoolId = "0008", StatusCode = 0 });
            mockDbContext.Object.CollectorSchools.Add(new CollectorSchool { CollectorId = 201650, SchoolId = "0286", StatusCode = 0 });
            string[] folderSchoolIds = new string[] { "0001", "0002", "0005", "0008" };
            var mockIFolderSchoolIds = new Mock<IFolderSchoolIds>();
            mockIFolderSchoolIds.Setup(x => x.GetFolderSchoolIds(It.IsAny<string>())).Returns(folderSchoolIds);

            //Act
            CollectorHandler collectorHandler = new CollectorHandler(201650, mockIFolderSchoolIds.Object, mockDbContext.Object);
            collectorHandler.UpdateCollectorSchools();            

            //Assert
            Assert.IsNotNull(collectorHandler);
            Assert.AreEqual(1, mockDbContext.Object.CollectorSchools.Where(x => x.SchoolId == "0001").Select(x => x.StatusCode).Single());
            Assert.AreEqual(1, mockDbContext.Object.CollectorSchools.Where(x => x.SchoolId == "0005").Select(x => x.StatusCode).Single());
            Assert.AreEqual(0, mockDbContext.Object.CollectorSchools.Where(x => x.SchoolId == "0286").Select(x => x.StatusCode).Single());

        }
    }
}

//var fileSystem = new MockFileSystem(new Dictionary<string, MockFileData>
//{
//    { @"c:\0001.txt", new MockFileData("Testing is meh.") },
//    { @"c:\0002.js", new MockFileData("some js") },
//    { @"c:\0003.gif", new MockFileData(new byte[] { 0x12, 0x34, 0x56, 0xd2 }) }
//});
//Collector collector = new Collector(201650, fileSystem);