using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Services.Extensions;

namespace Monit95App.Services.Tests
{
    [TestClass]
    public class ExtensionsTests
    {
        [TestMethod]
        public void NormalizeName_Test()
        {
            string name = " SA id -husAIn- ";

            string expectedResult = "Said-Husain";

            var actualResult = name.NormalizeName();

            Assert.AreEqual(expectedResult, actualResult);
        }
    }
}
