using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Linq;
using System.Data.Entity;
using Monit95App.Infrastructure.Data;
using Newtonsoft.Json;
using Monit95App.Services.Rsur.MarksProtocol;
using System.Collections.Generic;
using Monit95App.Domain.Core.Entities;
using NSubstitute;

namespace Monit95App.Services.Tests
{
    [TestClass]
    public class MarksProtocolServiceTest
    {
        [TestMethod]
        public void GetTest()
        {
            // Arrange         
            var data = new List<RsurTestResult>
            {
                new RsurTestResult
                {
                    RsurQuestionValues = "0;1",
                    RsurParticipTestId = 1,
                    RsurParticipTest = new RsurParticipTest
                    {
                        RsurParticipCode = 12345,
                        RsurTest = new RsurTest
                        {
                            IsOpen = true,
                            Test = new Test
                            {
                                NumberCode = "0101",
                                Name = "Орфография",
                                TestQuestions = new List<TestQuestion>
                                {
                                    new TestQuestion
                                    {
                                        Order = 1,
                                        Name = "1",
                                        Question = new Question
                                        {
                                            MaxMark = 1
                                        }
                                    }
                                }
                            }
                        },
                        RsurParticip = new RsurParticip
                        {
                            School = new Domain.Core.Entities.School
                            {
                                AreaCode = 201
                            }
                        }
                    }
                }
            }.AsQueryable();
            var mockSet = Substitute.For<DbSet<RsurTestResult>, IQueryable<RsurTestResult>>();
            ((IQueryable<RsurTestResult>)mockSet).Provider.Returns(data.Provider);
            ((IQueryable<RsurTestResult>)mockSet).Expression.Returns(data.Expression);
            ((IQueryable<RsurTestResult>)mockSet).ElementType.Returns(data.ElementType);
            ((IQueryable<RsurTestResult>)mockSet).GetEnumerator().Returns(data.GetEnumerator());
            var mockContext = Substitute.For<CokoContext>();
            mockContext.RsurTestResults.Returns(mockSet);
            var service = new MarksProtocolService(mockContext);

            // Act            
            var result = service.Get(12345, 201);

            // Assert            
            //Assert.AreEqual()
        }
    }
}
