using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Monit95App.Domain.Core;
using Monit95App.Infrastructure.Data.Tests;
using Monit95App.Infrastructure.Data;
using Monit95App.Api;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Collections;

namespace Monit95App.Web.Tests
{

    [TestClass]
    public class TResultControllerTest
    {      
        [TestMethod]
        public void TestGetOpenTestResultsForArea()
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

            var tresultList = new List<TestResult>
            {
                new TestResult
                {
                    TestId = new Guid("873D064B-8039-4255-8FC5-C0CE7F711B59"),
                    TestDate = new DateTime(2017, 02, 20),
                    Marks = "1;1;1;1;1;1;1;1;1;1;1;1;1;1;1|1;1;1;1;1;1;1;1;1;1;1;1;1;1;1",
                    ProjectParticip = new ProjectParticip { School = new School { AreaCode = 206 } }
                },
                new TestResult
                {
                    TestId = new Guid("873D064B-8039-4255-8FC5-C0CE7F711B59"),
                    TestDate = new DateTime(2017, 02, 20),                    
                    ProjectParticip = new ProjectParticip { School = new School { AreaCode = 206 } }
                },
                new TestResult
                {
                    TestId = new Guid("873D064B-8039-4255-8FC5-C0CE7F711B59"),
                    TestDate = new DateTime(2017, 02, 20),
                    Marks = "0;1;1;1;1;1;1;0;1;1;1;1;0;1;1|1;1;1;1;1;1;1;1;1;1;1;1;1;1;1",
                    ProjectParticip = new ProjectParticip { School = new School { AreaCode = 205 } }
                }
            };
            var mockTResultSetCreator = new MockTSetCreator<TestResult>();
            var mockTResultSet = mockTResultSetCreator.FactoryMethod(tresultList);

            //mocking context
            var mockContext = new Mock<cokoContext>();
            mockContext.Setup(x => x.TestResults).Returns(mockTResultSet.Object);           

            //Act
            var uow = new UnitOfWork(mockContext.Object);
            var tresultController = new TResultController(uow);
            var result = tresultController.GetOpenTestResultsForArea(206);
            
            int c = 0;
            var e = result.GetEnumerator();
            while (e.MoveNext()) //count results
                c++;            

            //Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(2, c);
        }
    }
}
