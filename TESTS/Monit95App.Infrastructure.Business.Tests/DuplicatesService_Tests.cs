using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.IO;
using System.Linq;

namespace Monit95App.Services.Tests
{
    [TestClass]
    public class DuplicatesService_Tests
    {
        [TestMethod]
        public void DeleteDuplicates()
        {
            var service = new DuplicatesService();
            var actual = service.GetNonDuplicateFiles(Directory.GetFiles("C:\\repositories\\tests"), "C:\\repositories\\tests_dist");

            var expected = 2;

            Assert.AreEqual(expected, actual.Count());
        }
    }
}
