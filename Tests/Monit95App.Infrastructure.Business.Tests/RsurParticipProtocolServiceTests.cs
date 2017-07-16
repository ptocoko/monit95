using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Domain.Core;
using Monit95App.Infrastructure.Business;
using Monit95App.Infrastructure.Data;
using Monit95App.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Infrastructure.Business.Tests
{
    [TestClass()]
    public class RsurParticipReportServiceTests
    {
        [TestMethod()]
        public void GetTestResultsGroupByParticipCodeTest()
        {
            //Arange
            var unitOfWork = new UnitOfWork(new cokoContext());
            var repository = new GenericRepository<Domain.Core.TestResult>(unitOfWork);
            var service = new RsurParticipProtocolService(repository);

            //Act
            var participGroupResults1 = service.GetTestResultsGroupByParticipCode("873D064B-8039-4255-8FC5-C0CE7F711B59");
            var participGroupResults2 = service.GetTestResultsGroupByParticipCode("873D064B-8039-4255-8FC5-C0CE7F711B59", new DateTime(2017, 5, 17))
                .Where(x=>x.Key == "2016-206-013").ToList().Single().Count();

            //Assert
            Assert.IsTrue(participGroupResults1.Count != 0);
            Assert.AreEqual(4, participGroupResults2);
        }
    }
}