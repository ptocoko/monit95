using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Monit95App.Services.Tests
{
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Linq;

    using Monit95App.Domain.Core.Entities;
    using Monit95App.Infrastructure.Data;
    using Monit95App.Services.Rsur;

    using NSubstitute;

    [TestClass]
    public class RsurTestServiceTests
    {
        [TestMethod]
        public void GetStatisticsTest()
        {
            // Arrange            
            var data = new List<RsurParticipTest>
            {
                new RsurParticipTest
                {
                    RsurTestId = 123,
                    RsurParticip = new RsurParticip { School = new School { AreaCode = 201 } },
                    RsurTest = new RsurTest()
                },
                new RsurParticipTest
                {
                    RsurTestId = 123,
                    RsurParticip = new RsurParticip { School = new School { AreaCode = 201 } }                    
                },
                new RsurParticipTest
                {
                    RsurTestId = 123,
                    RsurParticip = new RsurParticip { School = new School { AreaCode = 202 } }
                }
            }.AsQueryable();

            // create a mock DbSet exposing both DbSet and IQueryable interfaces for setup
            var mockSet = Substitute.For<DbSet<RsurParticipTest>, IQueryable<RsurParticipTest>>();

            // setup all IQueryable methods using what you have from "data"
            ((IQueryable<RsurParticipTest>)mockSet).Provider.Returns(data.Provider);
            ((IQueryable<RsurParticipTest>)mockSet).Expression.Returns(data.Expression);
            ((IQueryable<RsurParticipTest>)mockSet).ElementType.Returns(data.ElementType);
            ((IQueryable<RsurParticipTest>)mockSet).GetEnumerator().Returns(data.GetEnumerator());

            var mockContext = Substitute.For<CokoContext>();
            mockContext.RsurParticipTests.Returns(mockSet);
            var service = new RsurTestService(mockContext);

            // Act
            var result123 = service.GetStatistics(123); // coko
            var resutl123Area = service.GetStatistics(123, 201); // area
            // var rsultltEmpty = service.GetStatistics(0);

            // Assert
            Assert.AreEqual(33, result123.ProtocolStatus);
            Assert.AreEqual(50, resutl123Area.ProtocolStatus);
        }

        [TestMethod]
        public void GetProtocolTest()
        {
            // Arrange

            // Act

            //Assert
        }
    }
}
