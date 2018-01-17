using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Services.Tests.Util;
using NSubstitute;

namespace Monit95App.Services.Tests
{
    [TestClass]
    public class ValidatorTest
    {
        [TestMethod]
        public void AgeIsBetweenTest_Success()
        {
            var dateParam = new DateTime(1986, 04, 22);
            var resultCase1 = Validation.Validator.AgeIsBetween(dateParam, 3, 30);
            var resultCase2 = Validation.Validator.AgeIsBetween(dateParam, -1, 30);
            var resultCase3 = Validation.Validator.AgeIsBetween(dateParam, -1, 100);

            // Assert
            Assert.IsNull(resultCase1);
            Assert.IsNull(resultCase2);
            Assert.IsNull(resultCase3);
        }

        //[TestMethod]
        //[MyExpectedException(typeof(ArgumentException))]
        //public void AgeIsBetweenTest_ThrowArgumentException()
        //{
        //    // Arrange
        //    var dateParam = new DateTime(1886, 04, 22);

        //    // Act            
        //    var result2 = Validation.Validator.AgeIsBetween(dateParam, 3, 30);
        //}
    }
}
