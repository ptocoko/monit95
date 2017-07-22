using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Domain.Core;
using Monit95App.Infrastructure.Data;
using Monit95App.Services;
using Monit95App.Services.Interfaces;

namespace Monit95App.Infrastructure.BusinessTests
{
    [TestClass]
    public class TestResultServiceTest
    {
        [TestMethod]
        public void SelectParticipsGroupResultsTest()
        {
            var currentTestGuid = new Guid("595A73D4-F446-4916-A8C5-0E38BAB6A069"); //
            var currentTestDate = new DateTime(2017, 04, 10); //  

            var unitOfWork = new UnitOfWork(new cokoContext());
            TestResultService testResultService = new TestResultService(new GenericRepository<Element>(unitOfWork), 
                                                                        new GenericRepository<Domain.Core.TestResult>(unitOfWork));

            var results = testResultService.SelectParticipsGroupResults(currentTestGuid, currentTestDate);

            //Assert
            Assert.IsTrue(results.ParticipReports.Count != 0);
        }
    }
}
