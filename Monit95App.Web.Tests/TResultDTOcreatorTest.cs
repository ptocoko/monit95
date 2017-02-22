using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Models.Abstarct;
using Monit95App.Domain.Core;
using Monit95App.Models;

namespace Monit95App.Web.Tests
{
    [TestClass]
    public class TResultDTOcreatorTest
    {
        [TestMethod]
        public void FactoryMethodTest()
        {
            //Arrange
            var entity = new TestResult
            {
                ParticipCode = "2016-206-005",
                Marks = "1;1;1;1;1;1;1;1;1;1;1;1;1;1;1|1;1;1;1;1;1;1;1;1;1;1;1;1;1;1",
                TestPlan = new TestPlan { Test = new Test { Name = "Орфография"} },
                TestDate = new DateTime(2017, 02, 22)
            };

            //Act
            var creator = new TResultDTOcreator();
            var result = creator.FactoryMethod(entity);

            //Assert
            Assert.AreEqual("1;1;1;1;1;1;1;1;1;1;1;1;1;1;1", result.Marks);
            Assert.AreEqual("Орфография, 22.02.2017", result.TestNameWithTestDate);

        }
    }
}
