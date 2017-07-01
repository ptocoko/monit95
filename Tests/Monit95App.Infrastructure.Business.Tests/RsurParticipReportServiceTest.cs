using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Monit95App.Infrastructure.Business.Tests
{
    [TestClass]
    public class RsurParticipReportServiceTest
    {
        [TestMethod]
        public void GetTestsResultsGroupByParticipCodeTest()
        {
            //Arange
            var unitOfWork = new Data.UnitOfWorkV2(new Domain.Core.cokoContext());
            var repository = new Data.GenericRepository<Domain.Core.TestResult>(unitOfWork);
            var service = new RsurParticipReportService(repository);

            //Act
            var participGroupResults = service.GetTestResultsGroupByParticipCode("873D064B-8039-4255-8FC5-C0CE7F711B59", new DateTime(2017, 5, 17));

            //Assert
            Assert.IsNotNull(participGroupResults);

            //  Assert.Fail();
        }
    }
}
