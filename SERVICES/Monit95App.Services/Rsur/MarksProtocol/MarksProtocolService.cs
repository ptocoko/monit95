using System;
using System.Collections.Generic;
using System.Linq;
using Monit95App.Infrastructure.Data;
using Monit95App.Services.DTOs;
using Monit95App.Domain.Core.Entities;
using Monit95App.Domain.Core;

namespace Monit95App.Services.Rsur.MarksProtocol
{
    public class MarksProtocolService : IMarksProtocolService
    {
        #region Dependencies

        private readonly CokoContext context;

        #endregion

        public MarksProtocolService(CokoContext context)
        {
            this.context = context;
        }

        public RsurParticipEditProtocol GetProtocol(int rsurParticipTestId)
        {
            throw new NotImplementedException();
        }

        #region Service methods

        public IEnumerable<Monit95App.Domain.Core.MarksProtocol> GetProtocols(int rsurTestId, int areaCode)
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
                    .Select(s => s.Id); //получаем testId для всех открытых тестов

            var resultDict = new Dictionary<int, RsurTestStatisticsDto>();
            foreach (var rsurTestId in rsurTests)
            {
                var particips = context.RsurParticipTests.Where(x =>
                    x.RsurParticip.School.AreaCode == areaCode //получаем список всех участников для данного testId
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

        //public RsurTestStatisticsDto GetStatistics(int rsurTestId, int? areaCode = null)
        //{
        //    throw new NotImplementedException();
        //}

        //public IDictionary<int, RsurTestStatisticsDto> GetStatistics2(int areaCode)
        //{
        //    throw new NotImplementedException();
        //}

        public string GetTestName(int rsurTestId)
        {
            return context.RsurTests.Where(x => x.Id == rsurTestId)
                .Select(s => s.Test.NumberCode + " — " + s.Test.Name.Trim()).Single();
        }

        public Domain.Core.MarksProtocol Get(int participCode, int areaCode)
        {
            var rsurTestResultOfParticip = context.RsurTestResults.Single(x => x.RsurParticipTest.RsurParticipCode == participCode
                                                                            && x.RsurParticipTest.RsurParticip.School.AreaCode == areaCode
                                                                            && x.RsurParticipTest.RsurTest.IsOpen == true);
            var marksProtocol = new Domain.Core.MarksProtocol
            {
                ParticipCode = rsurTestResultOfParticip.RsurParticipTest.RsurParticipCode,
                ParticipTestId = rsurTestResultOfParticip.RsurParticipTestId,
                TestName = $"{rsurTestResultOfParticip.RsurParticipTest.RsurTest.Test.NumberCode} - {rsurTestResultOfParticip.RsurParticipTest.RsurTest.Test.Name}"
            };
            
            if(rsurTestResultOfParticip != null)
            {
                var currentMarks = rsurTestResultOfParticip.RsurQuestionValues.Split(';');
                var testQuestions = rsurTestResultOfParticip.RsurParticipTest.RsurTest.Test.TestQuestions.ToList();
                int index = 0;
                var questionResults = new List<QuestionResult>();
                foreach (var question in testQuestions.OrderBy(x => x.Order))
                {
                    questionResults.Add(new QuestionResult
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

        #endregion
    }
}