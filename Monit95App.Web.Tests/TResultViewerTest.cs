using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Models.Abstarct;
using Monit95App.Domain.Core;
using Monit95App.Models;

namespace Monit95App.Web.Tests
{
    [TestClass]
    public class TResultViewerTest
    {
        [TestMethod]
        public void TestCreateViewModel()
        {
            //Arrange
            var entity = new TestResult
            {
                ParticipCode = "2016-206-005",
                Marks = "1;1;1;1;1;1;1;1;1;1;1;1;1;1;1|1;1;1;1;1;1;1;1;1;1;1;1;1;1;1"
            };

            //Act
            var viewer = new TResultViewer();
            var result = viewer.CreateViewModel(entity);

            //Assert
            Assert.AreEqual("1;1;1;1;1;1;1;1;1;1;1;1;1;1;1", result.Marks);

        }
    }
}
