using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Domain.Interfaces;
using Monit95App.Services.Interfaces;
using Monit95App.Services.School;
using NSubstitute;
using Monit95App.Domain.Core.Entities;

namespace Monit95App.Infrastructure.BusinessTests
{
    [TestClass]
    public class SchoolService_Tests
    {
        private readonly IGenericRepository<School> _mockSchoolRepository = Substitute.For<IGenericRepository<School>>();
        private readonly IGenericRepository<SchoolEdit> _mockSchoolEditRepository = Substitute.For<IGenericRepository<SchoolEdit>>();
        private readonly ISchoolService _schoolService;

        private readonly Area _area = new Area()
        {
            Code = 205,
            Name = "г. Грозный"
        };
        private readonly TownType _townType = new TownType
        {
            Id = 2,
            Name = "Город"
        };
        private readonly School _school;

        public SchoolService_Tests()
        {
            _school = new School
            {
                Id = "0001",
                Name = "Школа № 1",
                Area = _area,
                TownType = _townType
            };
            _schoolService = new SchoolService(_mockSchoolRepository, _mockSchoolEditRepository);
        }
        

        [TestMethod]        
        public void GetModel_ReturnTest()
        {
            //Arrange                      
            _mockSchoolRepository.GetById(Arg.Any<string>()).Returns(_school);            
            _mockSchoolEditRepository.GetById(Arg.Any<string>()).Returns(new SchoolEdit());
            
            //Act
            var model = _schoolService.GetModel("0001");

            //Assert
            Assert.AreEqual(_school.Name, model.SchoolIdWithName);
            Assert.AreEqual("205 - г. Грозный", model.AreaCodeWithName);
            Assert.AreEqual(model.HasNameCorrection, true);
        }   

        [TestMethod]
        [ExpectedException(typeof(ArgumentException))]
        public void GetModel_ExceptionTest()
        {
            //Arrange
            var service = new SchoolService(_mockSchoolRepository, _mockSchoolEditRepository);
            
            //Act
            service.GetModel("0001");
        }
    }
}
