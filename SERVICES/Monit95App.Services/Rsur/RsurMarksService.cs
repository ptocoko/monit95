using Monit95App.Domain.Core.Entities;
using Monit95App.Domain.Interfaces;
using Monit95App.Services.DTOs;
using Monit95App.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Monit95App.Services
{
    public class RsurMarksService : IRsurMarksProtocolService
    {        
        private readonly string[] Block_0101 = new string[] { "8.1", "8.2", "8.3",
                                                              "9.1", "9.2", "9.3",
                                                              "10.1", "10.2", "10.3",
                                                              "11.1", "11.2", "11.3",
                                                              "12.1", "12.2", "12.3",
                                                              "13.1", "13.2", "13.3",
                                                              "14.1", "14.2", "14.3" };        

        private readonly IGenericRepository<RsurParticipTest> _participTestRepository;
        private readonly IGenericRepository<RsurParticip> _participRepository;
        private readonly IGenericRepository<RsurTestResult> _resultRepository;

        public RsurMarksService(IGenericRepository<RsurParticipTest> participTestRepository, 
                                IGenericRepository<RsurParticip> participRepository,
                                IGenericRepository<RsurTestResult> resultRepository)
        {
            _participTestRepository = participTestRepository;
            _participRepository = participRepository;
            _resultRepository = resultRepository;
        }

        public IEnumerable<RsurParticipMarksListDto> GetByAreaCodeAndRsurTestId(int areaCode, int rsurTestId)
        {
            var resutls = _participTestRepository.GetAll().Where(x => x.RsurParticip.School.AreaCode == areaCode && x.RsurTestId == rsurTestId).Select(s => new RsurParticipMarksListDto
            {
                ParticipTestId = s.Id,
                Code = s.RsurParticip.Code,
                Marks = s.RsurTestResult.RsurQuestionValues
            });
            return resutls.OrderBy(ob => ob.Code);
        }

        public RsurGetMarksDto GetByParticipTestId(int participTestId)
        {
            var result = _participTestRepository.GetAll().Where(x => x.Id == participTestId).ToList().Select(s => new RsurGetMarksDto
            {
                ParticipTestId = s.Id,
                Code = s.RsurParticip.Code,
                TestNumberCodeWithName = s.RsurTest.Test.NumberCode + " — " + s.RsurTest.Test.Name.Trim(),
                MarkNames = GetMarkNamesByTestId(s.RsurTestId),
                Marks = s.RsurTestResult == null ? null : s.RsurTestResult.RsurQuestionValues
            });

            return result.SingleOrDefault();
        }

        public void AddOrUpdateMarks(int participTestId, string marks)
        {
            var rsurResult = _resultRepository.GetById(participTestId);
            if(rsurResult == null)
            {
                var rsurTestResult = new RsurTestResult
                {
                    RsurParticipTestId = participTestId,
                    RsurQuestionValues = marks
                };
                _resultRepository.Insert(rsurTestResult);
            }
            else
            {
                rsurResult.RsurQuestionValues = marks;
                _resultRepository.Update(rsurResult);
            }
        }

        private string[] GetMarkNamesByTestId(int testId)
        {
            if (testId == 1082) return Block_0101;
            
            else throw new ArgumentException(nameof(testId));
        }
    }
}
