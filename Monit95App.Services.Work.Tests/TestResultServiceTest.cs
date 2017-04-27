﻿using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Services.Work.Abstract;
using Monit95App.Services.Work.Concrete;
using Monit95App.Domain.Core;
using System.Collections;
using System.Linq;

namespace Monit95App.Services.Work.Tests
{
    [TestClass]
    public class TestResultServiceTest
    {
        [TestMethod]
        public void SelectParticipsGroupResultsTest()
        {
            var currentTestGuid = new Guid("595A73D4-F446-4916-A8C5-0E38BAB6A069"); //
            var currentTestDate = new DateTime(2017, 04, 10); //  
                        
            ITestResultService testResultService = new TestResultService(new cokoContext());
            var results = testResultService.SelectParticipsGroupResults(currentTestGuid, currentTestDate).ToList();

            //Assert
            Assert.IsTrue(results.Count != 0);
        }
    }
}