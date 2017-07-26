using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Domain.Core;
using Monit95App.Infrastructure.Data;
using Monit95App.Services;
using Monit95App.Domain.Interfaces;
using Monit95App.Services.Models.Rsur;
using System.Collections.Generic;
using NSubstitute;
using System.Linq;

namespace Monit95App.Infrastructure.BusinessTests
{
    [TestClass]
    public class RsurParticipService_Tests
    {
        UnitOfWork unitOfWork;
        GenericRepository<ProjectParticip> rsurParticipRepository;
        GenericRepository<Domain.Core.TestResult> testResultRepository;
        RsurParticipViewer rsurParticipViewer;
        RsurParticipService service;

        public RsurParticipService_Tests()
        {
            unitOfWork = new UnitOfWork(new cokoContext());
            rsurParticipRepository = new GenericRepository<ProjectParticip>(unitOfWork);
            testResultRepository = new GenericRepository<Domain.Core.TestResult>(unitOfWork);
            rsurParticipViewer = new RsurParticipViewer();            
        }

        [TestMethod]
        public void Get_Test()
        {
            //Arrange
            var entities = new List<ProjectParticip>
            {
                new ProjectParticip
                {
                    ParticipCode = "2016-206-001",
                    Surname = "Shakhabov",
                    Name = "Adam",
                    SchoolId = "0005"
                }
            }.AsQueryable();

            var mockRsurParticipRespoitory = Substitute.For<IGenericRepository<ProjectParticip>>();
            mockRsurParticipRespoitory.GetAll().Returns(entities);

            service = new RsurParticipService(mockRsurParticipRespoitory, testResultRepository, rsurParticipViewer);

            //Act
            var result = service.Get(null, "0005");

            //Asssert
            Assert.Fail();
        }

        [TestMethod]
        public void Update_Test()
        {
            //Arrange


            var model = new RsurParticipFullInfo
            {
                ParticipCode = "2016-206-001",
                Surname = "Шахабов",
                Name = "Адам",
                SubjectName = "РУ"              
            };            
            
            //Act
           // service.Update(model);

            //Assert
            Assert.Fail();
        }
    }
}