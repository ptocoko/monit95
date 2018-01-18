using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;

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

        public void RsurSubjectName_Success()
        {
            var resultCase1 = Validation.Validator.ValidateRsurSubjectName("русский язык");
        }
    }
}
