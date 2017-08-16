using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Domain.Core;
using Monit95App.Infrastructure.Data;
using Monit95App.Services;
using Monit95App.Domain.Interfaces;
using Monit95App.Services.Models.Rsur;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using NSubstitute;
using System.Linq;
using Monit95App.Services.Rsur;
using Monit95App.Services.Interfaces;

namespace Monit95App.Infrastructure.BusinessTests
{
    [TestClass]
    public class RsurParticipService_Tests
    {        
        private readonly IGenericRepository<ProjectParticip> _mockRsurParticipRespoitory;
        private readonly IGenericRepository<ProjectParticipEdit> _mockRsurParticipEditRepository;
        private readonly IGenericRepository<Domain.Core.TestResult> _testResultRepository;
        RsurParticipViewer rsurParticipViewer;
        IRsurParticipService service;
        private readonly IRsurParticipEditService _mockRsurParticipEditService;

        public RsurParticipService_Tests()
        {            
            _testResultRepository = Substitute.For<IGenericRepository<Domain.Core.TestResult>>();
            rsurParticipViewer = new RsurParticipViewer();
            _mockRsurParticipRespoitory = Substitute.For<IGenericRepository<ProjectParticip>>();
            _mockRsurParticipEditRepository = Substitute.For<IGenericRepository<ProjectParticipEdit>>();
            _mockRsurParticipEditService = Substitute.For<IRsurParticipEditService>();
            service = new RsurParticipService(_mockRsurParticipRespoitory, _testResultRepository, rsurParticipViewer, _mockRsurParticipEditService);
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
            _mockRsurParticipEditRepository.GetById(Arg.Any<string>()).Returns(new ProjectParticipEdit());

            //Act
            var rsurParticipFullInfoList = service.Get(null, "0005");

            //Asssert            
            Assert.AreEqual(1, rsurParticipFullInfoList.Count());
            Assert.AreEqual("Adam", rsurParticipFullInfoList.Single().Name);            
        }

        [TestMethod]
        [ExpectedException(typeof(ValidationException))]
        public void UpdateByAdmin_ValidationException()
        {
            //Arrange                     
            var fullInfo = new RsurParticipFullInfo
            {
                Surname = "Shakhabov",
                Name = "Adam"
            };

            //Act
            var result = service.Update(fullInfo, true);

            //Assert
            //Excepted ValidationException
        }

        [TestMethod]        
        public void UpdateByAdmin_Ok()
        {
            //Arrange   
            var mockEntity = new ProjectParticip
            {
                ParticipCode = "2016-200-000",
                Surname = "oldShakhabov",
                Name = "Adam",                
            };
            _mockRsurParticipRespoitory.GetById("2016-200-000").Returns(mockEntity);       

            //Act
            var fullInfo = new RsurParticipFullInfo
            {
                ParticipCode = "2016-200-000",
                Surname = "Shakhabov",
                Name = "Adam",
                NsurSubjectName = "Орфография",
                SchoolIdWithName = "0005 - ",
            };
            var result = service.Update(fullInfo, true);
            var result2 = service.Update(fullInfo, false);

            //Assert
            Assert.AreEqual(fullInfo.Surname, result.Surname);
            Assert.AreEqual(false, fullInfo.HasSurnameEdit);

            _mockRsurParticipRespoitory.Received().GetById("2016-200-000");
            _mockRsurParticipRespoitory.Received().Update(Arg.Is<ProjectParticip>(x => x.Surname == "Shakhabov"));            
        }

        [TestMethod]
        public void UpdateByAdmin_Fail()
        {
            //Arrange   
            var mockEntity = new ProjectParticip
            {
                ParticipCode = "2016-200-000",
                Surname = "oldShakhabov",
                Name = "Adam",
            };
            _mockRsurParticipRespoitory.GetById("2016-200-000").Returns(mockEntity);

            //Act
            var fullInfo = new RsurParticipFullInfo
            {
                ParticipCode = "2016-200-000",
                Surname = "Shakhabov",
                Name = "Adam",
                NsurSubjectName = "Орфография",
                SchoolIdWithName = "0005 - ",
            };
            var result = service.Update(fullInfo, false);            

            //Assert
            Assert.AreEqual(fullInfo, result);
            _mockRsurParticipRespoitory.Received().GetById("2016-200-000");
            _mockRsurParticipRespoitory.DidNotReceive().Update(Arg.Is<ProjectParticip>(x => x.Surname == "Shakhabov"));
        }

        [TestMethod]
        public void UpdateByNoAdmin_Ok()
        {
            //Arrange   
            var mockEntity = new ProjectParticip
            {
                ParticipCode = "2016-200-000",
                Surname = "oldShakhabov",
                Name = "Adam",
            };
            _mockRsurParticipRespoitory.GetById("2016-200-000").Returns(mockEntity);

            //Act
            var fullInfo = new RsurParticipFullInfo
            {
                ParticipCode = "2016-200-000",
                Surname = "Shakhabov",
                Name = "Adam",
                NsurSubjectName = "Орфография",
                SchoolIdWithName = "0005 - ",
                HasSurnameEdit = false
            };
            var result = service.Update(fullInfo, false);            

            //Assert
            Assert.AreEqual(fullInfo, result);            
            _mockRsurParticipRespoitory.Received().GetById("2016-200-000");
            _mockRsurParticipRespoitory.DidNotReceive().Update(Arg.Is<ProjectParticip>(x => x.Surname == "Shakhabov"));

            _mockRsurParticipEditService.AddOrUpdate(fullInfo);
            Assert.AreEqual(true, result.HasSurnameEdit);
        }

        [TestMethod]
        public void GetByParticipCode_Ok()
        {

        }
    }
}