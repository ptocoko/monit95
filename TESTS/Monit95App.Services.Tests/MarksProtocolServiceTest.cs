using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

using Microsoft.VisualStudio.TestTools.UnitTesting;

using Monit95App.Domain.Core.Entities;
using Monit95App.Infrastructure.Data;
using Monit95App.Services.Tests.Util;

using NSubstitute;

namespace Monit95App.Services.Tests
{
    using Monit95App.Domain.Core;
    using Monit95App.Services.Rsur.MarksProtocol;
    using Monit95App.Services.Validations;

    [TestClass]
    public class MarksProtocolServiceTest
    {
        private readonly CokoContext mockContext;

        // Constructor
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
        public void CreateTest()
        {
            // Arrange            
            var data = new List<RsurParticipTest>
            {
                new RsurParticipTest
                {
                    RsurParticip = new RsurParticip
                    {
                        School = new Domain.Core.Entities.School
                        {
                            AreaCode = 201
                        }
                    },
                    Id = 1,
                    RsurTest = new RsurTest
                    {
                        IsOpen = true,
                        Test = new Test
                        {
                            TestQuestions = new List<TestQuestion>
                            {
                                new TestQuestion
                                {
                                    Order = 1,
                                    Question = new Question
                                    {
                                        MaxMark = 1
                                    }
                                },
                                new TestQuestion
                                {
                                    Order = 2,
                                    Question = new Question
                                    {
                                        MaxMark = 1
                                    }
                                },
                                new TestQuestion
                                {
                                    Order = 3,
                                    Question = new Question
                                    {
                                        MaxMark = 1
                                    }
                                },
                            }
                        }
                    }
                }
            }.AsQueryable();
            var mockSet = Substitute.For<DbSet<RsurParticipTest>, IQueryable<RsurParticipTest>>();
            ((IQueryable<RsurParticipTest>)mockSet).Provider.Returns(data.Provider);
            ((IQueryable<RsurParticipTest>)mockSet).Expression.Returns(data.Expression);
            ((IQueryable<RsurParticipTest>)mockSet).ElementType.Returns(data.ElementType);
            ((IQueryable<RsurParticipTest>)mockSet).GetEnumerator().Returns(data.GetEnumerator());
            var mockContext = Substitute.For<CokoContext>();
            mockContext.RsurParticipTests.Returns(mockSet);

            var service = new MarksProtocolService(mockContext);
            var marksProtocol = new MarksProtocol
            {
                ParticipTestId = 1,
                QuestionResults = new List<QuestionResult>()
                {
                 new QuestionResult { Order = 1, CurrentMark = 0 },
                 new QuestionResult { Order = 2, CurrentMark = 1 },
                 new QuestionResult { Order = 3, CurrentMark = 1 }
                }
            };
            var areaId = 201;

            
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
            var validationDictionary = Substitute.For<IValidationDictionary>();
            var service = new MarksProtocolService(mockContext, validationDictionary);

            // Act
            service.Get(12346, 201);
        }

        [TestMethod]
        public void GetCorrectParamsTest()
        {
            // Arrange     
            var validationDictionary = Substitute.For<IValidationDictionary>();
            var service = new MarksProtocolService(mockContext, validationDictionary);

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

            // question2
            Assert.AreEqual(question2.MaxMark, 1);
            Assert.AreEqual(question2.CurrentMark, 1);
        }
    }
}
