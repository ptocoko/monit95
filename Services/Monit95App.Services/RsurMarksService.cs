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
            var res = from particips in _participRepository.GetAll()
                      join participTest in _participTestRepository.GetAll() on particips.Code equals participTest.RsurParticipCode
                      where particips.School.AreaCode == areaCode && participTest.RsurTestId == rsurTestId
                      join a in _resultRepository.GetAll() on participTest.Id equals a.RsurParticipTestId
                      into b
                      from result in b.DefaultIfEmpty()
                      select new RsurParticipMarksListDto
                      {
                          ParticipTestId = participTest.Id,
                          Surname = particips.Surname,
                          Name = particips.Name,
                          SecondName = particips.SecondName,
                          Marks = result == null ? null : result.RsurQuestionValues
                      };

            return res;
        }

        public RsurGetMarksDto GetByParticipTestId(int participTestId)
        {
            var res = from participTest in _participTestRepository.GetAll()
                      where participTest.Id == participTestId
                      join particips in _participRepository.GetAll() on participTest.RsurParticipCode equals particips.Code
                      join a in _resultRepository.GetAll() on participTest.Id equals a.RsurParticipTestId
                      into b
                      from result in b.DefaultIfEmpty()
                      select new RsurGetMarksDto
                      {
                          ParticipTestId = participTest.Id,
                          Fio = particips.Surname + " " + particips.Name + " " + particips.SecondName,
                          TestNumberCodeWithName = participTest.RsurTest.Test.NumberCode + " - " + participTest.RsurTest.Test.Name.Trim(),
                          //TODO: realize MarksNames
                          Marks = result == null ? null : result.RsurQuestionValues
                      };

            return res.SingleOrDefault();
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

        public int GetValueOfFilling(int rsurTestId, int areaCode)
        {
            var participsActual = from participTest in _participTestRepository.GetAll()
                                 join particips in _participRepository.GetAll() on participTest.RsurParticipCode equals particips.Code
                                 where participTest.RsurTestId == rsurTestId && particips.School.AreaCode == areaCode
                                 select participTest.Id;

            var participsResult = from results in _resultRepository.GetAll()
                                  join particip in _participRepository.GetAll() on results.RsurParticipTest.RsurParticipCode equals particip.Code
                                  where results.RsurParticipTest.RsurTestId == rsurTestId && particip.School.AreaCode == areaCode
                                  select results.PrimaryMark;

            return (participsActual.Count() / participsResult.Count()) * 100;
        }
    }
}
