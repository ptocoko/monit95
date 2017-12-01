using System;
using System.Collections.Generic;
using System.Linq;
using Monit95App.Infrastructure.Data;
// ReSharper disable UnusedMember.Global

namespace Monit95App.Services.Rsur.MarksProtocol
{
    using System.ComponentModel.DataAnnotations;

    using Monit95App.Domain.Core;
    using Monit95App.Domain.Core.Entities;

    public class MarksProtocolService : IMarksProtocolService
    {
        #region Properties

        public List<ValidationResult> ModelValidationResults { get; } = new List<ValidationResult>();

        #endregion

        #region Dependencies

        private readonly CokoContext context;
        

        #endregion

        public MarksProtocolService(CokoContext context)
        {
            this.context = context;            
        }           

        #region Service methods


        public IEnumerable<MarksProtocol> GetProtocols(int rsurTestId, int areaCode)
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
                var particips = context.RsurParticipTests.Where(x =>
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
            return context.RsurTests.Where(x => x.Id == rsurTestId)
                                    .Select(s => s.Test.NumberCode + " — " + s.Test.Name.Trim()).Single();
        }

        public MarksProtocol Get(int participCode, int areaCode)
        {
            if (!Enumerable.Range(10000, 99999).Contains(participCode)
                || !Enumerable.Range(201, 217).Contains(areaCode))
            {
                throw new ArgumentException($"{nameof(participCode)} has to be 10000-99999 and {nameof(areaCode)} has to be 210-217");
            } 
            
            var rsurTestResultOfParticip = context.RsurTestResults.SingleOrDefault(x => x.RsurParticipTest.RsurParticipCode == participCode
                                                                                 && x.RsurParticipTest.RsurParticip.School.AreaCode == areaCode
                                                                                        && x.RsurParticipTest.RsurTest
                                                                                            .IsOpen);
            if (rsurTestResultOfParticip == null)
            {
                throw new ArgumentException($"{nameof(participCode)} is incorrect or is not access for current user");
            }

            var marksProtocol = new MarksProtocol
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

        public void CreateOrEditRsurTestResultEntity(MarksProtocol marksProtocol, int areaCode)
        {
            ModelValidationResults.Clear();
            if (marksProtocol == null)
            {
                ModelValidationResults.Add(new ValidationResult($"{nameof(marksProtocol)} is null"));
                return;
            }                

            if (marksProtocol.QuestionResults == null)
            {
                ModelValidationResults.Add(new ValidationResult($"{nameof(marksProtocol.QuestionResults)} "));
                return;
            }                

            var rsurParticipTest = context.RsurParticipTests.SingleOrDefault(x => x.RsurTest.IsOpen && x.Id == marksProtocol.ParticipTestId && x.RsurParticip.School.AreaCode == areaCode);
            if (rsurParticipTest == null)
            {
                ModelValidationResults.Add(new ValidationResult($"- RsurTest is not open;" +
                                                                $"- Or {nameof(marksProtocol.ParticipTestId)} or {nameof(areaCode)} is incorrect;" +
                                                                $"- Or user has not access to this entity"));
                return;
            }
            
            var testQuestions = rsurParticipTest.RsurTest.Test.TestQuestions.ToList(); // current test's testQuestions
            if (testQuestions.Count() != marksProtocol.QuestionResults.Count())
            {
                ModelValidationResults.Add(new ValidationResult($"{nameof(testQuestions)} count != {nameof(marksProtocol.QuestionResults)}"));
                return;
            }
            string rsurQuestionValues = string.Empty;
            
            marksProtocol.QuestionResults.ForEach(questionResult =>
            {
                var maxValue = testQuestions.Single(tq => tq.Order == questionResult.Order).Question.MaxMark;
                // если балл указан балл ниже -1 (отсутствовал) или больше допустимого, то устанавливается максимально допустимый
                if (questionResult.CurrentMark < -1 || questionResult.CurrentMark > maxValue)
                    questionResult.CurrentMark = maxValue;                
            });
            rsurQuestionValues = marksProtocol.QuestionResults.Select(s => s.CurrentMark.ToString()).Aggregate((totalCurrentMarks, nextCurrentMark) => $"{totalCurrentMarks};{nextCurrentMark}");

            // если хотя бы у обного задание в качестве значения (балл за задание) стоит -1, то считается что данный участник отсутствовал на диагностике (wasnot)
            if (rsurQuestionValues.IndexOf("-1") > -1)
                rsurQuestionValues = "wasnot";            

            var rsurTestResult = context.RsurTestResults.Find(marksProtocol.ParticipTestId);
            // create
            if (rsurTestResult == null) 
            {
                context.RsurTestResults.Add(new RsurTestResult
                {
                    RsurParticipTestId = marksProtocol.ParticipTestId,
                    FileId = marksProtocol.FileId,
                    RsurQuestionValues = rsurQuestionValues                    
                });
            }
            // edit
            else
            {
                rsurTestResult.RsurQuestionValues = rsurQuestionValues;
                rsurTestResult.FileId = marksProtocol.FileId;
            }
            context.SaveChanges();            
        }       

        #endregion
    }
}