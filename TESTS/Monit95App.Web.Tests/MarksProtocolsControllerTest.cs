using Microsoft.VisualStudio.TestTools.UnitTesting;
using NSubstitute;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Monit95App.Services.Rsur.TestResult;

namespace Monit95App.Web.Tests
{
    [TestClass]
    public class MarksProtocolsControllerTest
    {
        [TestMethod]
        public void PostTest()
        {
            // Arrange
            var fakeMarksProtocolService = Substitute.For<ITestResultService>();
            var fakeValidationResults = new List<ValidationResult>
            {
                new ValidationResult("some error 1"),
                new ValidationResult("some error 2")
            };
            //fakeMarksProtocolService.cr
            //var controller = new MarksProtocolsController(fakeMarksProtocolService);

            // Act

            // Asserts
        }
    }
}
