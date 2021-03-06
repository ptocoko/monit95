using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Services.Rsur.EgeQuestion;

namespace Monit95App.Services.Tests
{
    [TestClass]
    public class EgeQuestionServiceTest
    {
        [TestMethod]
        public void ComputeQuestionPercentTest()
        {
            // Arrange            
            var fakeEgeQuestionValues = new List<string>
            {
                "2(40%);5(0%);8(0%)",
                "2(70%);5(75%);8(58%)",
                "2(70%);15(75%);8(57.4%)",
            };

            // Act
            var result = EgeQuestionService.ComputeAverageValue(fakeEgeQuestionValues, 8);

            // Assert
            Assert.AreEqual(38.33, result);            
        }
    }
}
