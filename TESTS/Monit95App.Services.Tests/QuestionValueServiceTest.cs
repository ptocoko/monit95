using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

using Microsoft.VisualStudio.TestTools.UnitTesting;

using Monit95App.Domain.Core.Entities;
using Monit95App.Infrastructure.Data;
using Monit95App.Services.Rsur.QuestionValue;
using Monit95App.Services.Rsur.TestResult;
using Monit95App.Services.Tests.Util;

using NSubstitute;

namespace Monit95App.Services.Tests
{
    [TestClass]
    public class QuestionValueServiceTest
    {
        private readonly CokoContext mockContext;

        // Constructor
        public QuestionValueServiceTest()
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

            #region RsurParticipTest Mocking
            var participTestData = new List<RsurParticipTest>
            {
                new RsurParticipTest
                {
                    Id = 1234,
                    RsurParticipCode = 12345,
                    RsurTest = new RsurTest
                    {
                        IsOpen = true,
                        Test = new Test
                        {
                            NumberCode = "0101",
                            Name = "Орфография"
                        }
                    },
                    RsurParticip = new RsurParticip
                    {
                        School = new Domain.Core.Entities.School
                        {
                            AreaCode = 201
                        }
                    }
                },
                new RsurParticipTest
                {
                    Id = 1235,
                    RsurParticipCode = 12346,
                    RsurTest = new RsurTest
                    {
                        IsOpen = true,
                        Test = new Test
                        {
                            NumberCode = "0101",
                            Name = "Орфография"
                        }
                    },
                    RsurParticip = new RsurParticip
                    {
                        School = new Domain.Core.Entities.School
                        {
                            AreaCode = 201
                        }
                    },
                    RsurTestResult = new RsurTestResult
                    {
                        RsurQuestionValues = "1;0;1;0"
                    }
                }
            }.AsQueryable();
            var participTestMockSet = Substitute.For<DbSet<RsurParticipTest>, IQueryable<RsurParticipTest>>();
            ((IQueryable<RsurParticipTest>)participTestMockSet).Provider.Returns(participTestData.Provider);
            ((IQueryable<RsurParticipTest>)participTestMockSet).Expression.Returns(participTestData.Expression);
            ((IQueryable<RsurParticipTest>)participTestMockSet).ElementType.Returns(participTestData.ElementType);
            ((IQueryable<RsurParticipTest>)participTestMockSet).GetEnumerator().Returns(participTestData.GetEnumerator());
            #endregion

            this.mockContext = Substitute.For<CokoContext>();
            mockContext.RsurTestResults.Returns(mockSet);
            mockContext.RsurParticipTests.Returns(participTestMockSet);
        }

        [TestMethod]
        public void CreateOrEditTest()
        {
            // Arrange            
            // RsurParticipTest
            var rsurParticipTests = new List<RsurParticipTest>
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
                },
                 new RsurParticipTest
                {
                    RsurParticip = new RsurParticip
                    {
                        School = new Domain.Core.Entities.School
                        {
                            AreaCode = 201
                        }
                    },
                    Id = 2,
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
                },
            }.AsQueryable();
            var mockRsurParticipTestSet = Substitute.For<DbSet<RsurParticipTest>, IQueryable<RsurParticipTest>>();                      
            ((IQueryable<RsurParticipTest>)mockRsurParticipTestSet).Provider.Returns(rsurParticipTests.Provider);
            ((IQueryable<RsurParticipTest>)mockRsurParticipTestSet).Expression.Returns(rsurParticipTests.Expression);
            ((IQueryable<RsurParticipTest>)mockRsurParticipTestSet).ElementType.Returns(rsurParticipTests.ElementType);
            ((IQueryable<RsurParticipTest>)mockRsurParticipTestSet).GetEnumerator().Returns(rsurParticipTests.GetEnumerator());
            //--

            // RsurTestResult
            var rsurTestResults = new List<RsurTestResult>
            {
                new RsurTestResult
                {
                    RsurParticipTestId = 2,
                    RsurQuestionValues = "1;0;0"
                }
            }.AsQueryable();
            var mockRsurTestResultSet = Substitute.For<DbSet<RsurTestResult>, IQueryable<RsurTestResult>>();            
            //--

            var mockContext = Substitute.For<CokoContext>();
            mockContext.RsurParticipTests.Returns(mockRsurParticipTestSet);
            mockContext.RsurTestResults.Returns(mockRsurTestResultSet);

            var service = new QuestionValueService(mockContext);
            var marksProtocol1 = new QuestionValueEditDto()
            {
                ParticipTestId = 1,
                QuestionResults = new List<QuestionResult>()
                {
                 new QuestionResult { Order = 1, CurrentMark = 0 },
                 new QuestionResult { Order = 2, CurrentMark = 1 },
                 new QuestionResult { Order = 3, CurrentMark = 1 }
                }
            };
            var marksProtocol2 = new QuestionValueEditDto
            {
                ParticipTestId = 2,
                QuestionResults = new List<QuestionResult>()
                {
                 new QuestionResult { Order = 1, CurrentMark = -1 },
                 new QuestionResult { Order = 2, CurrentMark = -1 },
                 new QuestionResult { Order = 3, CurrentMark = -1 }
                }
            };
            var areaId = 201;

            // Act
            service.CreateOrUpdate(marksProtocol1, areaId);
            service.CreateOrUpdate(marksProtocol2, areaId);

            // Assert            
            mockContext.Received().SaveChanges();
            mockRsurTestResultSet.Received().Add(Arg.Is<RsurTestResult>(p => p.RsurParticipTestId == 1 && p.RsurQuestionValues == "0;1;1"));            
            mockRsurTestResultSet.Received().Add(Arg.Is<RsurTestResult>(p => p.RsurQuestionValues == "wasnot"));
        }

        [TestMethod]
        [MyExpectedException(typeof(ArgumentException), "participCode has to be 10000-99999 and areaCode has to be 210-217")]
        public void GetIncorrectParticipCodeTest()
        {
            // Arrange            
            var service = new QuestionValueService(mockContext);
            
            // Act
            service.Get(1234, 201);
        }

        [TestMethod]
        [MyExpectedException(typeof(ArgumentException), "participCode is incorrect or is not access for current user")]
        public void GetEmptyTest()
        {
            // Arrange            
            var service = new QuestionValueService(mockContext);

            // Act
            service.Get(12346, 201);
        }

        [TestMethod]
        public void GetCorrectParamsTest()
        {
            // Arrange                 
            var service = new QuestionValueService(mockContext);

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

        [TestMethod]
        public void GetQuestionProtocolsListTest()
        {
            var service = new QuestionValueService(new CokoContext());

            var result = service.GetQuestionProtocolList(201).Result;

            Assert.AreEqual(true, result.Count() > 0);
        }

        [TestMethod]
        public void GetEditDtoByFileId()
        {
            // Arrange
            var fakeRsurTestResults = new List<RsurTestResult>
            {
                new RsurTestResult
                {
                    RsurParticipTest = new RsurParticipTest
                    {
                        RsurParticip = new RsurParticip
                        {
                            School = new Domain.Core.Entities.School
                            {
                                AreaCode = 201
                            }
                        },
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
                                            MaxMark = 2
                                        }
                                    },
                                    new TestQuestion
                                    {
                                        Order = 3,
                                        Name = "3",
                                        Question = new Question
                                        {
                                            MaxMark = 1
                                        }
                                    },
                                }
                            }
                        },
                        RsurParticipCode = 12345                        
                    },
                    FileId = 1,
                    RsurParticipTestId = 1,
                    RsurQuestionValues = "1;0;1"
                }
            }.AsQueryable();
            var mockRsurTestResultSet = Substitute.For<DbSet<RsurTestResult>, IQueryable<RsurTestResult>>();
            ((IQueryable<RsurTestResult>)mockRsurTestResultSet).Provider.Returns(fakeRsurTestResults.Provider);
            ((IQueryable<RsurTestResult>)mockRsurTestResultSet).Expression.Returns(fakeRsurTestResults.Expression);
            ((IQueryable<RsurTestResult>)mockRsurTestResultSet).ElementType.Returns(fakeRsurTestResults.ElementType);
            ((IQueryable<RsurTestResult>)mockRsurTestResultSet).GetEnumerator().Returns(fakeRsurTestResults.GetEnumerator());
            var mockCokoContext = Substitute.For<CokoContext>();
            mockCokoContext.RsurTestResults.Returns(mockRsurTestResultSet);

            // Act
            var questionValueService = new QuestionValueService(mockCokoContext);
            var successResult = questionValueService.GetEditDtoByFileId(1, 201);

            // Assert
            Assert.IsNotNull(successResult);
            Assert.AreEqual(0, successResult.Errors.Count());
            Assert.AreEqual(0, successResult.Result.QuestionResults.Single(x => x.Order == 2).CurrentMark);
        }
    }
}
