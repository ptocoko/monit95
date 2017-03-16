using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Domain.Core;
using System.Collections.Generic;
using Moq;
using System.Linq;

namespace Monit95App.Infrastructure.Data.Tests
{
    [TestClass]
    public class TestExerMarkRepository
    {
        [TestMethod]
        public void TestGet()
        {
            //Arrange            
            var exerMarkList = new List<ExerMark>
            { 
                 new ExerMark
                 {
                     ProjectCode = 201661,
                     TestId = new Guid("873D064B-8039-4255-8FC5-C0CE7F711B59"),     
                     TestNumber = 1,                
                     TestDate = new DateTime(2017, 02, 22),
                     ParticipCode = "2016-206-001",
                     ExerNumber = 1
                 }                             
            }.AsQueryable();
            var mockExerMarkSetHandler = new MockTSetCreator<ExerMark>();
            var mockExerMarkSet = mockExerMarkSetHandler.FactoryMethod(exerMarkList);
            mockExerMarkSet.Setup(x => x.Find(It.IsAny<object[]>()))
              .Returns<object[]>(x => exerMarkList.FirstOrDefault(y => y.ProjectCode == Convert.ToInt32(x[0])
                                                                    && y.TestId == new Guid(x[1].ToString())
                                                                    && y.TestNumber == Convert.ToInt32(x[2])
                                                                    && y.TestDate.ToShortDateString() == x[3].ToString()
                                                                    && y.ParticipCode == x[4].ToString()
                                                                    && y.ExerNumber == Convert.ToInt32(x[5])));

            //mocking context
            var mockContext = new Mock<cokoContext>();
            mockContext.Setup(x => x.ExerMarks).Returns(mockExerMarkSet.Object);

            //Act
            var repos = new ExerMarkRepository(mockContext.Object);
            var result = repos.Get("201661&873D064B-8039-4255-8FC5-C0CE7F711B59&1&2017-02-22&2016-206-001&1");

            //Assert
            Assert.IsNotNull(result);
        }
    }
}
