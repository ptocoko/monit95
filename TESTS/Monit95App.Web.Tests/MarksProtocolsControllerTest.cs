﻿using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.RESTful_API.Rsur;
using Monit95App.Web.Api;
using NSubstitute;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Monit95App.Web.Tests
{
    using Monit95App.Services.Rsur.RsurTestResultService;

    [TestClass]
    public class MarksProtocolsControllerTest
    {
        [TestMethod]
        public void PostTest()
        {
            // Arrange
            var fakeMarksProtocolService = Substitute.For<IRsurTestResultService>();
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
