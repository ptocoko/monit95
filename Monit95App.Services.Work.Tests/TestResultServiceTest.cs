using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Domain.Work.Abstract;
using Monit95App.Domain.Work.Concrete;
using System.Collections;
using System.Linq;
using Monit95App.Domain.Core;
using Monit95App.Infrastructure.Data;

namespace Monit95App.Domain.Work.Tests
{
    [TestClass]
    public class TestResultServiceTest
    {
        [TestMethod]
        public void SelectParticipsGroupResultsTest()
        {
            var currentTestGuid = new Guid("595A73D4-F446-4916-A8C5-0E38BAB6A069"); //
            var currentTestDate = new DateTime(2017, 04, 10); //  
                        
            ITestResultService testResultService = new TestResultService(new GenericRepository<Element>(new UnitOfWorkV2(new cokoContext())), new GenericRepository<TestResult>(new UnitOfWorkV2(new cokoContext())));
            var results = testResultService.SelectParticipsGroupResults(currentTestGuid, currentTestDate);

            //Assert
            Assert.IsTrue(results.ParticipReports.Count != 0);
        }
    }
}
