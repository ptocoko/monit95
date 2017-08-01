using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Domain.Core;
using Monit95App.Domain.Interfaces;
using Monit95App.Services.Rsur;
using NSubstitute;

namespace Monit95App.Infrastructure.BusinessTests
{
    [TestClass]
    public class RsurParticipFullInfo_Tests
    {
        [TestMethod]
        public void TemplateMethod_Test()
        {
            //Arrange
            var entity = new ProjectParticip
            {
                ParticipCode = "2016-206-001",
                Surname = "Shakhabov",
                Name = "Adam",
                NsurSubject = new NsurSubject { Name = "Русккий язык"},                
                School = new School { Id = "0005", Name = "Школа № 1", Area = new Area {Code = 205, Name = "г. Грозный"}},
                Category = new Category { Name = "Без категории"}
            };
            var mockRsurParticipEditRepository = Substitute.For<IGenericRepository<ProjectParticipEdit>>();
            mockRsurParticipEditRepository.GetById(Arg.Any<string>()).Returns(new ProjectParticipEdit());
            var rsurParticipFullInfo = new RsurParticipFullInfo();
            
            //Act
            rsurParticipFullInfo.TemplateMethod(entity);

            //Assert            
            Assert.AreEqual("Adam", rsurParticipFullInfo.Name);
            Assert.AreEqual("Без категории", rsurParticipFullInfo.CategoryName);
            Assert.AreEqual("0005 - Школа № 1", rsurParticipFullInfo.SchoolIdWithName);       
            



            Assert.AreEqual("205 - г. Грозный", rsurParticipFullInfo.AreaName);            
        }
    }
}
