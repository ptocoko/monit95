using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Domain.Interfaces;
using Moq;
using Monit95App.Domain.Core;
using System.Collections.Generic;
using System.Linq;

namespace Monit95App.Infrastructure.Data.Tests
{
    [TestClass]
    public class ParticipCodeCreatorTest
    {
        [TestMethod]
        public void FactoryMethodTest()
        {
            //Arrange
            //mocking PParticips
            var pparticipList = new List<ProjectParticip>
            {
                new ProjectParticip { ParticipCode = "2016-205-011", School = new School { AreaCode = 205 } },
                new ProjectParticip { ParticipCode = "2016-206-001", School = new School { AreaCode = 206 } },
                new ProjectParticip { ParticipCode = "2016-206-002", School = new School { AreaCode = 206 } },
                new ProjectParticip { ParticipCode = "2016-206-004", School = new School { AreaCode = 206 } },
            };
            var mockPParticipSetHandler = new MockTSetCreator<ProjectParticip>();
            var mockPParticipSet = mockPParticipSetHandler.FactoryMethod(pparticipList);

            //mocking Schools
            var schoolList = new List<School>
            {
                new School { Id = "0053", AreaCode = 206 }
            }.AsQueryable();            
            var mockSchoolSetHandler = new MockTSetCreator<School>();
            var mockSchoolSet = mockSchoolSetHandler.FactoryMethod(schoolList);                        
            mockSchoolSet.Setup(x => x.Find(It.IsAny<object[]>()))                   //configue Find()
                .Returns<object[]>(x => schoolList.FirstOrDefault(y => y.Id == x[0]));

            //mocking context
            var mockContext = new Mock<cokoContext>();
            mockContext.Setup(x => x.ProjectParticips).Returns(mockPParticipSet.Object);
            mockContext.Setup(x => x.Schools).Returns(mockSchoolSet.Object);

            //Act            
            var newParticip = new ProjectParticip
            {
                ProjectCode = 201661,
                SchoolId = "0053",
                Surname = "Шахабов",
                Name = "Адам",
                SecondName = "Хаважиевич",
                CategId = 0,
                Experience = 0,
                Phone = "89280168396",
                Email = "theadamo86@gmail.com",                                                                
            };

            var participCodeCreator = new PParticipCodeCreator(mockContext.Object);
            var result = participCodeCreator.FactoryMethod(newParticip);

            //Assert
            Assert.AreEqual("2016-206-003", result);            
            //Assert.IsNotNull(result);
        }
    }
}
