using System;
using System.Collections.Generic;
using System.Linq;
using Monit95App.Infrastructure.Data;
using Monit95App.Services.DTOs;
// ReSharper disable UnusedMember.Global

namespace Monit95App.Services.Rsur.MarksProtocol
{
    using System.ComponentModel.DataAnnotations;
    using System.Diagnostics.CodeAnalysis;

    using Monit95App.Domain.Core;
    using Monit95App.Services.Interfaces;
    using Monit95App.Services.Validations;

    public class MarksProtocolService : IMarksProtocolService
    {
        #region Dependencies

        private readonly CokoContext context;
        private readonly IValidationDictionary validatonDictionary;

        #endregion

        public MarksProtocolService(CokoContext context, IValidationDictionary validatonDictionary)
        {
            this.context = context;
            this.validatonDictionary = validatonDictionary;
        }

        public RsurParticipEditProtocol GetProtocol(int rsurParticipTestId)
        {
            throw new NotImplementedException();
        }

        [SuppressMessage("StyleCop.CSharp.LayoutRules", "SA1503:CurlyBracketsMustNotBeOmitted", Justification = "Reviewed. Suppression is OK here.")]
        public IEnumerable<ValidationResult> ValidatePostMarksProtocol(PostMarksProtocol postMarksProtocol)
        {
            // 1) Validate by attributes
            var validationResults = new List<ValidationResult>();
            var validationContext = new ValidationContext(postMarksProtocol);
                       
            if (Validator.TryValidateObject(postMarksProtocol, validationContext, validationResults, true))
            {
                
            }

            if (postMarksProtocol?.ParticipTestId <= 0)
                validatonDictionary.AddError(nameof(postMarksProtocol), $"{nameof(postMarksProtocol.ParticipTestId)} <= 0");

           // ValidationResult.Success


            return validationResults;
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

        public Domain.Core.MarksProtocol Get(int participCode, int areaCode)
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

        public void Create(PostMarksProtocol postMarksProtocol, int areaCode)
        {
            throw new NotImplementedException();
        }

        public void Add(PostMarksProtocol postMarksProtocol, int areaCode)
        {
            if (!Enumerable.Range(201, 217).Contains(areaCode))
            {
                throw new ArgumentException(nameof(areaCode));
            }


            throw new NotImplementedException();
        }        

        #endregion
    }
}