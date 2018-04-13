using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monit95App.Services.Rsur.ParticipReport;
using System.Linq;
using Monit95App.Infrastructure.Data;
using System.Collections.Generic;
using Monit95App.Domain.Core.Entities;
using NSubstitute;
using System.Data.Entity;

namespace Monit95App.Services.Tests
{
    [TestClass]
    public class RsurParticipReportService_Test
    {
        CokoContext context;

        [TestInitialize]
        public void Init()
        {
            context = new CokoContext();
        }

        [TestMethod]
        public void GetExtendReportTest()
        {
            // Arrange
            var fakeRsurTestResults = new List<RsurTestResult>
            {
                new RsurTestResult
                {
                    EgeQuestionValues = "1(20%);3(60%)",
                    Grade5 = 2,
                    RsurParticipTestId = 17989,
                    RsurParticipTest = new RsurParticipTest
                    {
                        RsurTest = new RsurTest
                        {
                            TestDate = new System.DateTime(2017,12, 20),
                            Test = new Test
                            {
                                NumberCode = "0103",
                                Name = "Лексика и фразеология && Обработка текстов",
                                Questions = new List<RsurQuestion>
                                {
                                    new RsurQuestion
                                    {
                                        Order = 1,
                                        EgeQuestion = new EgeQuestion
                                        {
                                            Order = 1,
                                            ElementNames = "Информационная обработка текстов различных стилей и жанров"
                                        }
                                    },
                                    new RsurQuestion
                                    {
                                        Order = 2,
                                        EgeQuestion = new EgeQuestion
                                        {
                                            Order = 1,
                                            ElementNames = "Информационная обработка текстов различных стилей и жанров"
                                        }
                                    },
                                    new RsurQuestion
                                    {
                                        Order = 6,
                                        EgeQuestion = new EgeQuestion
                                        {
                                            Order = 3,
                                            ElementNames = "Лексическое значение слова"
                                        }
                                    },
                                    new RsurQuestion
                                    {
                                        Order = 7,
                                        EgeQuestion = new EgeQuestion
                                        {
                                            Order = 3,
                                            ElementNames = "Лексическое значение слова"
                                        }
                                    },
                                }
                            }
                        },
                        RsurParticipCode = 11407,
                        RsurParticip = new RsurParticip
                        {
                            Surname = "Шахабов",
                            Name = "Адам",
                            SecondName = "Хаважиевич",
                            School = new Domain.Core.Entities.School
                            {
                                AreaCode = 205
                            }
                        }
                    }
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
            var rsurParticipService = new ParticipReportService(mockCokoContext);
            var result = rsurParticipService.GetExtendReport(17989, 205);

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual("Лексическое значение слова", result.Result.EgeQuestionResults.Where(x => x.EgeQuestionNumber == 3).First().ElementNames);
            Assert.AreEqual(20, result.Result.EgeQuestionResults.Single(x => x.EgeQuestionNumber == 1).Value);
        }

        //[TestMethod]
        //public void GetResultsForArea()
        //{
        //    // Arrange
        //    // Mocking DbSet<RsurTestResults>
        //    var fakeRsurTestResults = new List<RsurTestResult>
        //    {
        //        new RsurTestResult
        //        {
        //            RsurParticipTestId = 16077,
        //            Grade5 = 5,
        //            RsurParticipTest = new RsurParticipTest
        //            {
        //                RsurParticip = new RsurParticip
        //                {
        //                    Surname = "Эсилаева",
        //                    Name = "Айна",
        //                    SecondName = "Халидовна",
        //                    School = new Domain.Core.Entities.School
        //                    {
        //                        Id = "0001",
        //                        Name = "МБОУ «Гордали-Юртовская СШ»",
        //                        AreaCode = 201
        //                    },
        //                    ActualCode = 1,
        //                    Code = 11842
        //                },
        //                RsurTest = new RsurTest
        //                {
        //                    TestDate = new System.DateTime(2017, 12, 20),
        //                    Test = new Test
        //                    {
        //                        NumberCode = "0101",
        //                        Name = "Орфография"
        //                    },
        //                    ExamName = "Декабрь-2017",
        //                }
        //            }
        //        }
        //    }.AsQueryable();
        //    var mockRsurTestResultSet = Substitute.For<DbSet<RsurTestResult>, IQueryable<RsurTestResult>>();
        //    ((IQueryable<RsurTestResult>)mockRsurTestResultSet).Provider.Returns(fakeRsurTestResults.Provider);
        //    ((IQueryable<RsurTestResult>)mockRsurTestResultSet).Expression.Returns(fakeRsurTestResults.Expression);
        //    ((IQueryable<RsurTestResult>)mockRsurTestResultSet).ElementType.Returns(fakeRsurTestResults.ElementType);
        //    ((IQueryable<RsurTestResult>)mockRsurTestResultSet).GetEnumerator().Returns(fakeRsurTestResults.GetEnumerator());

        //    // Mocking CokoContex
        //    var mockCokoContext = Substitute.For<CokoContext>();
        //    mockCokoContext.RsurTestResults.Returns(mockRsurTestResultSet);

        //    var participReportService = new ParticipReportService(mockCokoContext);

        //    // Act
        //    var successResult = participReportService.GetReports(areaCode: 201);
        //    var failResult = participReportService.GetReportsForArea(202);

        //    // Assert
        //    Assert.IsNotNull(successResult);
        //    Assert.AreEqual(false, successResult.Errors.Any());
        //    Assert.AreEqual(true, failResult.Errors.Any());
        //    Assert.AreEqual(11842, successResult.Result.Single().ParticipCode);
        //    Assert.AreEqual("ЗАЧЕТ", successResult.Result.Single().TestStatus);
        //    Assert.AreEqual("0101 — Орфография", successResult.Result.Single().TestName);
        //    Assert.AreEqual("Декабрь-2017", successResult.Result.Single().ExamName);
        //    Assert.AreEqual("0001 — МБОУ «Гордали-Юртовская СШ»", successResult.Result.Single().SchoolParticipInfo.SchoolName);                             
        //}

        //[TestMethod]
        //public void GetResultsForSchool()
        //{
        //    // Arrange
        //    // Mocking DbSet<RsurTestResults>
        //    var fakeRsurTestResults = new List<RsurTestResult>
        //    {
        //        new RsurTestResult
        //        {
        //            RsurParticipTestId = 16077,
        //            Grade5 = 5,
        //            RsurParticipTest = new RsurParticipTest
        //            {
        //                RsurParticip = new RsurParticip
        //                {
        //                    Surname = "Эсилаева",
        //                    Name = "Айна",
        //                    SecondName = "Халидовна",
        //                    School = new Domain.Core.Entities.School
        //                    {
        //                        Id = "0001",
        //                        Name = "МБОУ «Гордали-Юртовская СШ»",
        //                        AreaCode = 201
        //                    },
        //                    ActualCode = 1,
        //                    Code = 11842,
        //                    SchoolId = "0001"
        //                },
        //                RsurTest = new RsurTest
        //                {
        //                    TestDate = new System.DateTime(2017, 12, 20),
        //                    Test = new Test
        //                    {
        //                        NumberCode = "0101",
        //                        Name = "Орфография"
        //                    },
        //                    ExamName = "Декабрь-2017",
        //                }
        //            }
        //        }
        //    }.AsQueryable();
        //    var mockRsurTestResultSet = Substitute.For<DbSet<RsurTestResult>, IQueryable<RsurTestResult>>();
        //    ((IQueryable<RsurTestResult>)mockRsurTestResultSet).Provider.Returns(fakeRsurTestResults.Provider);
        //    ((IQueryable<RsurTestResult>)mockRsurTestResultSet).Expression.Returns(fakeRsurTestResults.Expression);
        //    ((IQueryable<RsurTestResult>)mockRsurTestResultSet).ElementType.Returns(fakeRsurTestResults.ElementType);
        //    ((IQueryable<RsurTestResult>)mockRsurTestResultSet).GetEnumerator().Returns(fakeRsurTestResults.GetEnumerator());

        //    // Mocking CokoContex
        //    var mockCokoContext = Substitute.For<CokoContext>();
        //    mockCokoContext.RsurTestResults.Returns(mockRsurTestResultSet);

        //    var participReportService = new ParticipReportService(mockCokoContext);

        //    // Act
        //    var successResult = participReportService.GetReportsForSchool("0001");
        //    var failResult = participReportService.GetReportsForSchool("0002");

        //    // Assert
        //    Assert.IsNotNull(successResult);
        //    Assert.AreEqual(false, successResult.Errors.Any());
        //    Assert.AreEqual(true, failResult.Errors.Any());
        //    Assert.AreEqual(11842, successResult.Result.Single().ParticipCode);
        //    Assert.AreEqual("ЗАЧЕТ", successResult.Result.Single().TestStatus);
        //    Assert.AreEqual("0101 — Орфография", successResult.Result.Single().TestName);
        //    Assert.AreEqual("Декабрь-2017", successResult.Result.Single().ExamName);
        //    Assert.AreEqual("0001 — МБОУ «Гордали-Юртовская СШ»", successResult.Result.Single().SchoolParticipInfo.SchoolName);
        //}
    }
}
