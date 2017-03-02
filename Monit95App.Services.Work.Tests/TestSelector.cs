using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Domain.Core;
using System.Collections.Generic;
using System.Linq;
using Monit95App.Infrastructure.Data.Tests;
using Moq;
using Monit95App.Services.Work.Concrete;

namespace Monit95App.Services.Work.Tests
{
    [TestClass]
    public class TestSelector
    {
        [TestMethod]
        public void TestGetOpenProjectTestForArea()
        {
            var projectTestList = new List<ProjectTest>
            {
                new ProjectTest
                {
                    ProjectCode = 201661,
                    TestId = new Guid("873D064B-8039-4255-8FC5-C0CE7F711B59"),
                    Test = new Test { NumberCode = "0101", Name = "Орфография" },
                    TestNumber = 1,
                    TestDate = new DateTime(2017, 02, 27),
                    StatusCode = true,
                    ParticipTests = new List<ParticipTest>
                    {
                        new ParticipTest
                        {
                            ProjectParticip = new ProjectParticip { School = new School { AreaCode = 206 } },
                            ParticipCode = "2016-206-001",
                            IsWas = true,
                            ExerMarks = new List<ExerMark>
                            {
                                new ExerMark
                                {
                                    ExerNumber = 1,                                    
                                    Mark = 0,
                                    TestExercis = new TestExercis { ExerMaxMark = 1 }
                                }
                            }                            
                        }
                    }                                        
                }
            }.AsQueryable();
            var mockProjectTestSetHandler = new MockTSetCreator<ProjectTest>();
            var mockprojectTestSet = mockProjectTestSetHandler.FactoryMethod(projectTestList);

            //mocking context
            var mockContext = new Mock<cokoContext>();
            mockContext.Setup(x => x.ProjectTests).Returns(mockprojectTestSet.Object);

            //Act
            var selector = new Selector(mockContext.Object);
            var result = selector.GetOpenProjectTestForArea(201661, areaCode:206, schoolId:null);
            var first = result.FirstOrDefault();

            //Assert
            Assert.IsNotNull(result);
            Assert.AreEqual("Орфография", first.TestName);
            Assert.AreEqual("2016-206-001", first.ParticipTestDTOs.Single().ParticipCode);
            Assert.AreEqual(1, first.ParticipTestDTOs.Single().ExerMarkDTOs.Single().ExerMaxMark);
            Assert.AreEqual(0, first.ParticipTestDTOs.Single().ExerMarkDTOs.Single().ExerCurrentMar);
        }
    }
}
