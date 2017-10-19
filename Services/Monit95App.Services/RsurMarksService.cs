using Monit95App.Domain.Core.Entities;
using Monit95App.Domain.Interfaces;
using Monit95App.Services.DTOs;
using Monit95App.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services
{
    public class RsurMarksService : IRsurMarksService
    {
        private readonly string[] DATY_Mark_Names = new string[] { "2.1", "2.2", "2.3", "2.4", "2.5", "2.6", "2.7", "2.8", "2.9", "2.10", "5.1", "5.2", "5.3", "5.4", "5.5", "5.6", "5.7", "5.8", "8.1", "8.2", "8.3", "8.4", "8.5", "8.6", "8.7" };
        private readonly string[] TERMINY_Mark_Names = new string[] { "10.1", "10.2", "10.3", "10.4", "10.5", "10.6", "10.7", "10.8", "10.9", "10.10", "9.1", "9.2", "9.3", "9.4", "9.5", "9.6", "9.7", "9.8", "9.9", "8.1", "8.2", "8.3", "8.4", "8.5", "8.6", "8.7", "8.8" };

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
            if (testId == 1090) return DATY_Mark_Names;
            else if (testId == 1091) return TERMINY_Mark_Names;
            else throw new ArgumentException(nameof(testId));
        }
    }
}
