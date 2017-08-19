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
using Monit95App.Domain.Core.Entities;

namespace Monit95App.Infrastructure.BusinessTests
{
    [TestClass]
    public class RsurParticipService_Tests
    {        
        private readonly IGenericRepository<ProjectParticip> _rsurParticipRepository;
        private readonly IGenericRepository<Domain.Core.Entities.TestResult> _testResultRepository;        
        private readonly IRsurParticipViewer _rsurParticipViewer;

        private IRsurParticipService service;        

        public RsurParticipService_Tests()
        {
            _rsurParticipRepository = Substitute.For<IGenericRepository<ProjectParticip>>();
            _testResultRepository = Substitute.For<IGenericRepository<Domain.Core.Entities.TestResult>>();            
            _rsurParticipViewer = Substitute.For<IRsurParticipViewer>();
                                    
            service = new RsurParticipService(_rsurParticipRepository, _testResultRepository, _rsurParticipViewer);
        }

        [TestMethod]
        public void Get_TestAreaCall()
        {
            //Arrange
            var entities = new List<ProjectParticip>
            {
                new ProjectParticip
                {
                    ParticipCode = "2016-201-001",
                    Surname = "Shakhabov",
                    Name = "Adam",
                    SchoolId = "0005",
                    School = new School {Area = new Area (), AreaCode = 201},
                       
                },
                new ProjectParticip
                {
                    ParticipCode = "2016-202-002",
                    Surname = "Esembaev",
                    Name = "Husain",
                    SchoolId = "0006",
                    School = new School {Area = new Area (), AreaCode = 202},
                }
            }.AsQueryable();            
            _rsurParticipRepository.GetAll().Returns(entities);
            var rsurParticipService = Substitute.ForPartsOf<RsurParticipService>(_rsurParticipRepository, _testResultRepository, _rsurParticipViewer);
            rsurParticipService.When(service => service.GetByParticipCode(Arg.Any<string>())).DoNotCallBase();            

            //Act
            var resultRsurParticipFullInfoList = rsurParticipService.Get(201);

            //Asssert            
            Assert.AreEqual(1, resultRsurParticipFullInfoList.Count());          
        }

        [TestMethod]
        [ExpectedException(typeof(ValidationException))]
        public void PartUpdate_TestValidationException()
        {
            //Act
            var fullInfo = new RsurParticipFullInfo
            {
                ParticipCode = "2016-200-000",
                Surname = "Shakhabov"                
            };
            var result = service.PartUpdate(fullInfo);
        }

        [TestMethod]        
        public void PartUpdate_TestOk()
        {
            //Arrange
            var mockEntity = new ProjectParticip
            {
                ParticipCode = "2016-200-000",
                Surname = "Shakhabova",
                Name = "Adam"
            };
            _rsurParticipRepository.GetById("2016-200-000").Returns(mockEntity);

            //Act
            var fullInfo = new RsurParticipFullInfo
            {
                ParticipCode = "2016-200-000",
                Surname = "Shakhabov",
                Name = "Adam",
                NsurSubjectName = "NotNull",
                SchoolIdWithName = "NotNull"
            };
            var resultFullInfo = service.PartUpdate(fullInfo);

            //Assert
            Assert.IsNotNull(resultFullInfo);
            Assert.AreEqual(true, resultFullInfo.HasSurnameEdit);
            Assert.AreEqual(false, resultFullInfo.HasNameEdit);

        }

        [TestMethod]
        public void GetByParticipCode_Ok()
        {

        }
    }
}