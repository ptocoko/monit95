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
using Monit95App.Models;

namespace Monit95App.Web.Tests
{

    [TestClass]
    public class TResultControllerTest
    {      
        [TestMethod]
        public void TestGetOpenTestResultsForArea()
        {
            //Arrange
            //mocking TResult     
            var tresultList = new List<TestResult>
            {
                new TestResult
                {
                    TestId = new Guid("873D064B-8039-4255-8FC5-C0CE7F711B59"),
                    TestDate = new DateTime(2017, 02, 22),
                    Marks = "1;1;1;1;1;1;1;1;1;1;1;1;1;1;1|1;1;1;1;1;1;1;1;1;1;1;1;1;1;1",
                    ProjectParticip = new ProjectParticip { ParticipCode = "2016-206-001", School = new School { AreaCode = 206 } },
                    TestPlan = new TestPlan { StatusCode = true, Test = new Test { Name = "Орфография"} }
                },
                 new TestResult
                {
                    TestId = new Guid("873D064B-8039-4255-8FC5-C0CE7F711B59"),
                    TestDate = new DateTime(2017, 02, 22),
                    Marks = "1;1;1;1;1;1;1;1;1;1;1;1;1;1;1|1;1;1;1;1;1;1;1;1;1;1;1;1;1;1",
                    ProjectParticip = new ProjectParticip { ParticipCode = "2016-206-002", School = new School { AreaCode = 206 } },
                    TestPlan = new TestPlan { StatusCode = true, Test = new Test { Name = "Орфография"}  }
                },
            };
            var mockTResultSetCreator = new MockTSetCreator<TestResult>();
            var mockTResultSet = mockTResultSetCreator.FactoryMethod(tresultList);

            //mocking context
            var mockContext = new Mock<cokoContext>();
            mockContext.Setup(x => x.TestResults).Returns(mockTResultSet.Object);           

            //Act            
            var tresultController = new TResultController(mockContext.Object, new TResultDTOcreator());
            var result = tresultController.GetOpenTestResultsForArea(206);
            
            int c = 0;
            var e = result.Result.GetEnumerator();
            TResultDTO ob = null;
            while (e.MoveNext()) //count results
            {
                ob = e.Current;
                c++;
            }
                
            //Assert
            Assert.IsNotNull(ob);
            Assert.IsInstanceOfType(ob, typeof(TResultDTO));
            Assert.AreEqual(2, c);
        }
    }
}
