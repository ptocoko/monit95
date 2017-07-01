using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Domain.Core;
using Monit95App.Infrastructure.Business;
using Monit95App.Infrastructure.Data;
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
            var unitOfWork = new UnitOfWorkV2(new cokoContext());
            var repository = new GenericRepository<Domain.Core.TestResult>(unitOfWork);
            var service = new RsurParticipProtocolService(repository);
            
            //Act
            //Assert


            Assert.Fail();
        }

        [TestMethod()]
        public void CreateReportModelTest()
        {
            Assert.Fail();
        }
    }
}