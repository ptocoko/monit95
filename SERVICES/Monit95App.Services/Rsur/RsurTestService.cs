using System;
using System.Collections.Generic;
using System.Linq;

namespace Monit95App.Services.Rsur
{

    using Monit95App.Infrastructure.Data;
    using Monit95App.Services.DTOs;
    using Monit95App.Services.Interfaces;

    public class RsurTestService : IRsurTestService
    {
        #region Dependencies

        private readonly CokoContext context;

        #endregion

        public RsurTestService(CokoContext context)
        {
            this.context = context;
        }

        public IEnumerable<RsurTestProtocol> GetProtocols(int rsurTestId, int areaCode)
        {
            var protocols = context.RsurTestResults.Where(x => x.RsurParticipTest.RsurTestId == rsurTestId && x.RsurParticipTest.RsurParticip.School.AreaCode == areaCode)
                                                   .Select(x => new RsurTestProtocol
                                                   {
                                                       RsurParticipTestId = x.RsurParticipTestId,
                                                       RsurQuestionValues = x.RsurQuestionValues,
                                                       RsurParticipCode = x.RsurParticipTest.RsurParticipCode
                                                   })
                                                   .OrderBy(x => x.RsurParticipCode).ToList();

            return protocols;
        }

        #region Service methods

        public RsurTestStatisticsDto GetStatistics(int rsurTestId, int? areaCode = null)
        {
            var particips = this.context.RsurParticipTests.Where(x => x.RsurTestId == rsurTestId);

            if (areaCode != null)
            {
                particips = particips.Where(x => x.RsurParticip.School.AreaCode == areaCode);
            }

            var countParticips = particips.Count();
            var resultDto = new RsurTestStatisticsDto();
            double result;
            if (countParticips == 0)
            {
                //throw new ArgumentException(nameof(rsurTestId));
                resultDto.HasAnyParticip = false;
                result = 0;
            }
            else
            {
                resultDto.HasAnyParticip = true;
                double countParticipsWithResults = particips.Count(x => x.RsurTest != null);
                result = Math.Round(countParticipsWithResults / countParticips * 100, 0);
            }

            resultDto.ProtocolStatus = (int)result;
            return resultDto;
        }

        public IDictionary<int, RsurTestStatisticsDto> GetStatistics2(int areaCode)
        {
            var particips = this.context.RsurParticipTests.Where(x => x.RsurTest.IsOpen && x.RsurParticip.School.AreaCode == areaCode).GroupBy(x => x.RsurTestId);

            var resultDict = new Dictionary<int, RsurTestStatisticsDto>();
            foreach(var particip in particips)
            {
                var countParticips = particip.Count();
                var resultDto = new RsurTestStatisticsDto();
                double result;
                if (countParticips == 0)
                {
                    //throw new ArgumentException(nameof(rsurTestId));
                    resultDto.HasAnyParticip = false;
                    result = 0;
                }
                else
                {
                    resultDto.HasAnyParticip = true;
                    double countParticipsWithResults = particip.Count(x => x.RsurTestResult != null);
                    result = Math.Round(countParticipsWithResults / countParticips * 100, 0);
                }

                resultDto.ProtocolStatus = (int)result;
                resultDict.Add(particip.Key, resultDto);
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