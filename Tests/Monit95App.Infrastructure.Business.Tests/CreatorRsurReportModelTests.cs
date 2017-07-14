using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Infrastructure.Data;
using Monit95App.Domain.Core;
using Monit95App.Infrastructure.Business;

namespace Monit95App.Infrastructure.BusinessTests
{
    [TestClass]
    public class CreatorRsurReportModelTests
    {
        [TestMethod]
        public void CreateTest()
        {
            //Arrange
            var unitOfWork = new UnitOfWork(new cokoContext());
            var repository = new GenericRepository<ProjectParticip>(unitOfWork);
            var creator = new CreatorRsurReportModel(repository);

            //Act
            var result = creator.Create();
            var resultArea = creator.Create(2066);
            //Assert
            Assert.Fail();
        }
    }
}
