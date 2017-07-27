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
using Monit95App.Services.Rsur;
using Monit95App.Services.Interfaces;

namespace Monit95App.Infrastructure.BusinessTests
{
    [TestClass]
    public class RsurParticipService_Tests
    {
        UnitOfWork unitOfWork;
        private readonly IGenericRepository<ProjectParticip> _mockRsurParticipRespoitory;
        private readonly IGenericRepository<ProjectParticipsEdit> _mockRsurParticipEditRepository;
        private readonly GenericRepository<Domain.Core.TestResult> testResultRepository;
        RsurParticipViewer rsurParticipViewer;
        IRsurParticipService service;

        public RsurParticipService_Tests()
        {
            unitOfWork = new UnitOfWork(new cokoContext());            
            testResultRepository = new GenericRepository<Domain.Core.TestResult>(unitOfWork);
            rsurParticipViewer = new RsurParticipViewer();
            _mockRsurParticipRespoitory = Substitute.For<IGenericRepository<ProjectParticip>>();
            _mockRsurParticipEditRepository = Substitute.For<IGenericRepository<ProjectParticipsEdit>>();
            service = new RsurParticipService(_mockRsurParticipRespoitory, testResultRepository, 
                                              _mockRsurParticipEditRepository, rsurParticipViewer);
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
                    SchoolId = "0005",
                    School = new School {Area = new Area()}                    
                },
                new ProjectParticip
                {
                    ParticipCode = "2016-206-002",
                    Surname = "Esembaev",
                    Name = "Husain",
                    SchoolId = "0006",
                    School = new School {Area = new Area()}
                }
            }.AsQueryable();            
            _mockRsurParticipRespoitory.GetAll().Returns(entities);
            _mockRsurParticipEditRepository.GetById(Arg.Any<string>()).Returns(new ProjectParticipsEdit());

            //Act
            var rsurParticipFullInfoList = service.Get(null, "0005");

            //Asssert            
            Assert.AreEqual(1, rsurParticipFullInfoList.Count());
            Assert.AreEqual("Adam", rsurParticipFullInfoList.Single().Name);            
        }

        [TestMethod]
        public void Update_Test()
        {
            //Arrange                     
            var model = new RsurParticipFullInfo
            {
                Surname = "Shakhabov",
                Name = "Adam"
            };

            //Act
            service.Update(null);

            //Assert
            Assert.Fail();
        }
    }
}