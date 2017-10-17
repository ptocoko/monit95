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
        private readonly string[] ALG_Mark_Names = new string[] { "1.1", "1.2", "1.3", "2.1", "2.2", "2.3", "3.1", "3.2", "3.3", "4.1", "4.2", "4.3", "5.1", "5.2", "5.3", "6.1", "6.2", "6.3", "12.1", "12.2", "12.3", "19.1", "19.2", "19.3" };
        private readonly string[] GEOM_Mark_Names = new string[] { "8.1", "8.2", "8.3", "8.4", "13.1", "13.2", "13.3", "13.4", "15.1", "15.2", "15.3", "15.4", "16.1", "16.2", "16.3", "16.4" };
        private readonly string[] FUNC_Mark_Names = new string[] { "7.1", "7.2", "7.3", "10.1", "10.2", "10.3", "11.1", "11.2", "11.3", "14.1", "14.2", "14.3", "17.1", "17.2", "17.3", "18.1", "18.2", "18.3" };

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
            if (testId == 1084 || testId == 1088) return ALG_Mark_Names;
            else if (testId == 1085 || testId == 1089) return GEOM_Mark_Names;
            else if (testId == 1086) return FUNC_Mark_Names;
            else throw new ArgumentException(nameof(testId));
        }
    }
}
