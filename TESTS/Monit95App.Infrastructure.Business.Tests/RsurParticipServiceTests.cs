using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Domain.Core;
using Monit95App.Infrastructure.Data;
using Monit95App.Services;
using Monit95App.Domain.Interfaces;
using Monit95App.Services.Models.Rsur;

namespace Monit95App.Infrastructure.BusinessTests
{
    [TestClass]
    public class RsurParticipServiceTests
    {
        [TestMethod]
        public void UpdateTest()
        {
            //Arrange
            var unitOfWork = new UnitOfWork(new cokoContext());
            var rsurParticipRepository = new GenericRepository<ProjectParticip>(unitOfWork);
            var testResultRepository = new GenericRepository<Domain.Core.TestResult>(unitOfWork);
            var rsurParticipViewer = new RsurParticipViewer();
            var service = new RsurParticipService(unitOfWork, rsurParticipRepository, testResultRepository, rsurParticipViewer);

            var model = new RsurParticipBaseInfo
            {
                ParticipCode = "2016-206-001",
                Surname = "Шахабов",
                Name = "Адам",
                SubjectName = "РУ"
              //  SchoolIdWithName = "0001 - Школа № 1"
            };            
            
            //Act
            service.Update(model);

            //Assert
            Assert.Fail();
        }
    }
}

//[Required]
//public string ParticipCode { get; set; }

//[Required]
//public string Surname { get; set; }

//[Required]
//public string Name { get; set; }

//public string SecondName { get; set; }

//[Required]
//public string SubjectName { get; set; }

//[Required]
//public string SchoolIdWithName { get; set; }