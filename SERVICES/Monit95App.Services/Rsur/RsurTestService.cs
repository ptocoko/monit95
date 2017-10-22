using System;
using System.Collections.Generic;
using System.Linq;

namespace Monit95App.Services.Rsur
{
    using Monit95App.Infrastructure.Data;
    using Monit95App.Services.DTOs;
    using Monit95App.Services.Interfaces;

    public class RsurTestService : IRsurParticipProtocolService
    {
        #region Dependencies

        private readonly CokoContext context;

        #endregion

        public RsurTestService(CokoContext context)
        {
            this.context = context;
        }

        #region Service methods

        public IEnumerable<RsurParticipShowProtocol> GetProtocols(int rsurTestId, int areaCode)
        {
            var protocols = context.RsurParticipTests.Where(x => x.RsurTestId == rsurTestId && x.RsurParticip.School.AreaCode == areaCode)
                                                  .Select(x => new RsurParticipShowProtocol
                                                  {
                                                      RsurParticipTestId = x.Id,
                                                      RsurParticipCode = x.RsurParticipCode,
                                                      RsurQuestionValues = x.RsurTestResult.RsurQuestionValues                                                      
                                                  })
                                                  .OrderBy(x => x.RsurParticipCode).ToList();

            if (!protocols.Any())
            {
                throw new ArgumentException("Parameters rsurTestId or areaCode is incorrect");
            }

            return protocols;
        }

        public IDictionary<int, RsurTestStatisticsDto> GetStatistics(int areaCode)
        {
            var rsurTests = this.context.RsurTests.Where(x => x.IsOpen).Select(s => s.Id); //получаем testId для всех открытых тестов

            var resultDict = new Dictionary<int, RsurTestStatisticsDto>();
            foreach(var rsurTestId in rsurTests)
            {
                var particips = context.RsurParticipTests.Where(x => x.RsurParticip.School.AreaCode == areaCode  //получаем список всех участников для данного testId
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
                    result = Math.Round(participsWithoutMarks/participsCount * 100, 0); 
                }

                resultDto.ProtocolStatus = (int)result;
                resultDict.Add(rsurTestId, resultDto);
            }
            return resultDict;
        }

        public string GetTestName(int rsurTestId)
        {
            return context.RsurTests.Where(x => x.Id == rsurTestId).Select(s => s.Test.NumberCode + " — " + s.Test.Name.Trim()).Single();
        }

        #endregion
    }
}

//public IEnumerable<ParticipMarksDto> GetParticipMarksDtos(int projectTestId, string schoolId)
//{
//if (schoolId == null)
//{
//throw new ArgumentNullException(nameof(schoolId));
//}

//var dtos = from participTest in _participTestRepository.GetAll()
//where participTest.ProjectTestId == projectTestId && participTest.Particip.SchoolId == schoolId
//join particip in _participRepository.GetAll() on participTest.ParticipId equals particip.Id
//join a in _resultRepository.GetAll() on participTest.Id equals a.ParticipTestId
//into b
//from result in b.DefaultIfEmpty()
//select new ParticipMarksDto
//{
//ParticipTestId = participTest.Id,
//Surname = particip.Surname,
//Name = particip.Name,
//SecondName = particip.SecondName,
//ClassName = particip.Class.Name,
//Marks = result == null ? null : result.Marks
//};

//return dtos.ToList();
//}