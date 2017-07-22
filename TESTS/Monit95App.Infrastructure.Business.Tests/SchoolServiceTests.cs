using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Domain.Core;
using Monit95App.Domain.Interfaces;
using Monit95App.Infrastructure.Data;
using Monit95App.Services.School;
using NSubstitute;

namespace Monit95App.Infrastructure.BusinessTests
{
    [TestClass]
    public class SchoolServiceTests
    {
        private readonly IGenericRepository<School> _mockSchoolRepository = Substitute.For<IGenericRepository<School>>();
        private readonly IGenericRepository<SchoolsEdit> _mockSchoolEditRepository = Substitute.For<IGenericRepository<SchoolsEdit>>();
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

        public SchoolServiceTests()
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
            _mockSchoolEditRepository.GetById(Arg.Any<string>()).Returns(new SchoolsEdit());
            
            //Act
            var model = _schoolService.GetModel("0001");

            //Assert
            Assert.AreEqual(_school.Name, model.Name);
            Assert.AreEqual("205 - г. Грозный", model.AreaName);
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
