using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Linq;
using System.Data.Entity;
using Monit95App.Infrastructure.Data;
using Monit95App.Services.Rsur.MarksProtocol;
using System.Collections.Generic;
using Monit95App.Domain.Core.Entities;
using NSubstitute;
using Monit95App.Services.Tests.Util;
using System;

namespace Monit95App.Services.Tests
{
    [TestClass]
    public class MarksProtocolServiceTest
    {
        private readonly CokoContext mockContext;

        public MarksProtocolServiceTest()
        {
            var data = new List<RsurTestResult>
            {
                new RsurTestResult
                {
                    RsurQuestionValues = "0;1;0",
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
                                    },
                                    new TestQuestion
                                    {
                                        Order = 2,
                                        Name = "2",
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
            this.mockContext = Substitute.For<CokoContext>();
            mockContext.RsurTestResults.Returns(mockSet);
        }

        [TestMethod]
        [MyExpectedException(typeof(ArgumentException), "participCode has to be 10000-99999 and areaCode has to be 210-217")]
        public void GetIncorrectParticipCodeTest()
        {
            // Arrange
            var service = new MarksProtocolService(mockContext);

            // Act
            service.Get(1234, 201);
        }

        [TestMethod]
        [MyExpectedException(typeof(ArgumentException), "participCode is incorrect or is not access for current user")]
        public void GetEmptyTest()
        {
            // Arrange
            var service = new MarksProtocolService(mockContext);

            // Act
            service.Get(12346, 201);
        }

        [TestMethod]
        public void GetCorrectParamsTest()
        {
            // Arrange         
            var service = new MarksProtocolService(mockContext);

            // Act            
            var protocol = service.Get(12345, 201);
            var question1 = protocol.QuestionResults.Single(x => x.Order == 1);
            var question2 = protocol.QuestionResults.Single(x => x.Order == 2);

            // Assert            
            Assert.AreEqual(12345, protocol.ParticipCode);
            Assert.AreEqual(1, protocol.ParticipTestId);
            Assert.AreEqual("0101-Орфография", protocol.TestName);
            // question1
            Assert.AreEqual(question1.Order, 1);
            Assert.AreEqual(question1.Name, "1");
            // question1
            Assert.AreEqual(question2.MaxMark, 1);
            Assert.AreEqual(question2.CurrentMark, 1);
        }
    }
}
