// --------------------------------------------------------------------------------------------------------------------
// <copyright company="Center for Evaluation of the Quality of Education" file="RsurTestResultService.cs">
//   Copyright (c) CEQE.  All rights reserved.
// </copyright>
// <summary>
//   
// </summary>
// --------------------------------------------------------------------------------------------------------------------

// ReSharper disable StringIndexOfIsCultureSpecific.1

using System;
using System.Collections.Generic;
using System.Linq;
using Monit95App.Domain.Core.Entities;
using Monit95App.Infrastructure.Data;
using Monit95App.Services.Validation;

namespace Monit95App.Services.Rsur.TestResult
{
    /// <summary>
    /// Provides the APIs for managing test's results in a persistence store.
    /// </summary>
    public class TestResultService : ITestResultService
    { 
        #region Dependencies

        private readonly CokoContext context;

        #endregion

        #region All Constructors

        public TestResultService(CokoContext context)
        {
            this.context = context;
        }        

        #endregion

        #region Methods

        public IEnumerable<TestResulteEditDto> GetProtocols(int rsurTestId, int areaCode)
        {
            //var protocols = context.RsurParticipTests
            //    .Where(x => x.RsurTestId == rsurTestId && x.RsurParticip.School.AreaCode == areaCode)
            //    .Select(x => new MarksProtocol
            //    {
            //        RsurParticipTestId = x.Id,
            //        RsurParticipCode = x.RsurParticipCode,
            //        RsurQuestionValues = x.RsurTestResult.RsurQuestionValues
            //    })
            //    .OrderBy(x => x.RsurParticipCode).ToList();

            //if (!protocols.Any())
            //{
            //    throw new ArgumentException("Parameters rsurTestId or areaCode is incorrect");
            //}

            throw new NotImplementedException();
        }

        public IDictionary<int, RsurTestStatisticsDto> GetStatistics(int areaCode)
        {
            var rsurTests =
                this.context.RsurTests.Where(x => x.IsOpen)
                    .Select(s => s.Id); // получаем testId для всех открытых тестов

            var resultDict = new Dictionary<int, RsurTestStatisticsDto>();
            foreach (var rsurTestId in rsurTests)
            {
                var particips = this.context.RsurParticipTests.Where(x =>
                    x.RsurParticip.School.AreaCode == areaCode // получаем список всех участников для данного testId
                    && x.RsurTestId == rsurTestId);
                double participsCount = particips.Count();
                double participsWithoutMarks;

                var resultDto = new RsurTestStatisticsDto();
                double result;
                if (particips == null || participsCount == 0)
                {
                    resultDto.HasAnyParticip = false;
                    result = 0;
                }
                else
                {
                    resultDto.HasAnyParticip = true;
                    participsWithoutMarks = particips.Count(s => s.RsurTestResult.RsurQuestionValues != null);
                    result = Math.Round(participsWithoutMarks / participsCount * 100, 0);
                }

                resultDto.ProtocolStatus = (int) result;
                resultDict.Add(rsurTestId, resultDto);
            }
            return resultDict;
        }

        public string GetTestName(int rsurTestId)
        {
            return this.context.RsurTests.Where(x => x.Id == rsurTestId)
                                    .Select(s => s.Test.NumberCode + " — " + s.Test.Name.Trim()).Single();
        }

        public TestResulteEditDto Get(int participCode, int areaCode)
        {
            if (!Enumerable.Range(10000, 99999).Contains(participCode)
                || !Enumerable.Range(201, 217).Contains(areaCode))
            {
                throw new ArgumentException($"{nameof(participCode)} has to be 10000-99999 and {nameof(areaCode)} has to be 210-217");
            } 
            
            var rsurTestResultOfParticip = this.context.RsurTestResults.SingleOrDefault(x => x.RsurParticipTest.RsurParticipCode == participCode
                                                                                 && x.RsurParticipTest.RsurParticip.School.AreaCode == areaCode
                                                                                        && x.RsurParticipTest.RsurTest
                                                                                            .IsOpen);
            if (rsurTestResultOfParticip == null)
            {
                throw new ArgumentException($"{nameof(participCode)} is incorrect or is not access for current user");
            }

            var marksProtocol = new TestResulteEditDto
            {
                ParticipCode = rsurTestResultOfParticip.RsurParticipTest.RsurParticipCode,
                ParticipTestId = rsurTestResultOfParticip.RsurParticipTestId,
                TestName = $"{rsurTestResultOfParticip.RsurParticipTest.RsurTest.Test.NumberCode}-{rsurTestResultOfParticip.RsurParticipTest.RsurTest.Test.Name}"
            };
            
            if(rsurTestResultOfParticip != null)
            {
                var currentMarks = rsurTestResultOfParticip.RsurQuestionValues.Split(';');
                var testQuestions = rsurTestResultOfParticip.RsurParticipTest.RsurTest.Test.TestQuestions.ToList();
                int index = 0;
                marksProtocol.QuestionResults = new List<QuestionResult>();
                foreach (var question in testQuestions.OrderBy(x => x.Order))
                {
                    marksProtocol.QuestionResults.Add(new QuestionResult
                    {
                        Order = question.Order,
                        Name = question.Name,
                        MaxMark = question.Question.MaxMark,
                        CurrentMark = int.Parse(currentMarks[index])
                    });
                    index++;
                }
            }
            
            return marksProtocol;            
        }
        
        /// <summary>
        /// Добавляет/редактирует баллы по заданиям 
        /// </summary>
        /// <param name="testResultDto"></param>
        /// <param name="areaCode"></param>
        /// <returns></returns>
        public VoidResult CreateOrUpdate(TestResulteEditDto testResultDto, int areaCode)
        {
            var result = new VoidResult();                                         
            
            if (testResultDto == null)
            {
                result.Errors.Add(new ServiceError { Description = $"{nameof(testResultDto)} is null" });                
                return result;
            }                

            if (testResultDto.QuestionResults == null)
            {
                result.Errors.Add(new ServiceError { Description = $"{nameof(testResultDto.QuestionResults)}" });                
                return result;
            }                

            var rsurParticipTest = context.RsurParticipTests.SingleOrDefault(x => x.RsurTest.IsOpen && x.Id == testResultDto.ParticipTestId && x.RsurParticip.School.AreaCode == areaCode);
            if (rsurParticipTest == null)
            {
                result.Errors.Add(new ServiceError {                    
                    Description = "- RsurTest is not open;" +
                                 $"- Or {nameof(testResultDto.ParticipTestId)} or {nameof(areaCode)} is incorrect;" +
                                  "- Or user has not access to this entity"
                });                
                return result;
            }
            
            var testQuestions = rsurParticipTest.RsurTest.Test.TestQuestions.ToList(); // current test's testQuestions
            if (testQuestions.Count != testResultDto.QuestionResults.Count)
            {
                result.Errors.Add(new ServiceError { Description = $"{nameof(testQuestions)} count != {nameof(testResultDto.QuestionResults)}" });                
                return result;
            }            
            
            testResultDto.QuestionResults.ForEach(questionResult =>
            {
                var maxValue = testQuestions.Single(tq => tq.Order == questionResult.Order).Question.MaxMark;

                // если балл указан балл ниже -1 (отсутствовал) или больше допустимого, то устанавливается максимально допустимый
                if (questionResult.CurrentMark < -1 || questionResult.CurrentMark > maxValue)
                {
                    questionResult.CurrentMark = maxValue;
                } 
            });
            var rsurQuestionValues = testResultDto.QuestionResults.Select(s => s.CurrentMark.ToString()).Aggregate((totalCurrentMarks, nextCurrentMark) => $"{totalCurrentMarks};{nextCurrentMark}");

            // если хотя бы у обного задание в качестве значения (балл за задание) стоит -1, 
            // то считается что данный участник отсутствовал на диагностике (wasnot)
            if (rsurQuestionValues.IndexOf("-1") > -1)
            {
                rsurQuestionValues = "wasnot";
            }
                
            var rsurTestResult = context.RsurTestResults.Find(testResultDto.ParticipTestId);

            // create
            if (rsurTestResult == null) 
            {
                this.context.RsurTestResults.Add(new RsurTestResult
                {
                    RsurParticipTestId = testResultDto.ParticipTestId,
                    FileId = testResultDto.FileId,
                    RsurQuestionValues = rsurQuestionValues                    
                });
            }            
            else
            {
                // edit
                rsurTestResult.RsurQuestionValues = rsurQuestionValues;
                rsurTestResult.FileId = testResultDto.FileId;
            }

            context.SaveChanges();
            return result;
        }

        public ServiceResult<IEnumerable<TestResultViewDto>> GetAll(int areaCode)
        {
            var result = new ServiceResult<IEnumerable<TestResultViewDto>>();

            var entities = context.RsurTestResults.Where(x => x.RsurParticipTest.RsurParticip.School.AreaCode == areaCode
                                                           && x.RsurParticipTest.RsurTest.IsOpen).ToList();

            if (!entities.Any())
            {
                result.Errors.Add(new ServiceError { HttpCode = 404 });
                return result;
            }

            result.Result = entities.Select(entity => new TestResultViewDto
            {
                ParticipCode = entity.RsurParticipTest.RsurParticipCode,
                TestName = $"{entity.RsurParticipTest.RsurTest.Test.NumberCode}-{entity.RsurParticipTest.RsurTest.Test.Name}",
                RsurQuestionValues = entity.RsurQuestionValues,
                FileSourceName = entity.File.SourceName //for Model #2
            });

            return result;
        }

        public ServiceResult<IEnumerable<dynamic>> GetQuestionProtocolList(int areaCode)
        {
            var result = new ServiceResult<IEnumerable<dynamic>>();

            var entities = context.RsurParticipTests.Where(x => x.RsurParticip.School.AreaCode == areaCode
                                                             && x.RsurTest.IsOpen);

            if (!entities.Any())
            {
                result.Errors.Add(new ServiceError { HttpCode = 404 });
                return result;
            }

            result.Result = entities.Select(s => new
            {
                ParticipCode = s.RsurParticipCode,
                ParticipTestId = s.Id,
                RsurQuestionValues = s.RsurTestResult.RsurQuestionValues,
                TestName = s.RsurTest.Test.NumberCode + "-" + s.RsurTest.Test.Name
            });

            return result;
        }

        public VoidResult MarkAsAbsent(int participTestId)
        {
            var result = new VoidResult();

            var participResult = context.RsurTestResults.SingleOrDefault(s => s.RsurParticipTestId == participTestId);

            if (participResult == null)
            {
                result.Errors.Add(new ServiceError { HttpCode = 404, Description = $"Test result with {nameof(participTestId)} equals {participTestId} not exist" });
                return result;
            }

            participResult.RsurQuestionValues = "wasnot";

            return result;
        }

        #endregion
    }
}