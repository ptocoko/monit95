﻿using Monit95App.Domain.Core.Entities;
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
            var resutls = _participTestRepository.GetAll().Where(x => x.RsurParticip.School.AreaCode == areaCode && x.RsurTestId == rsurTestId).Select(s => new RsurParticipMarksListDto
            {
                ParticipTestId = s.Id,
                Surname = s.RsurParticip.Surname,
                Name = s.RsurParticip.Name,
                SecondName = s.RsurParticip.SecondName,
                Marks = s.RsurTestResult.RsurQuestionValues
            });
            return resutls;
        }

        public RsurGetMarksDto GetByParticipTestId(int participTestId)
        {
            var result = _participTestRepository.GetAll().Where(x => x.Id == participTestId).Select(s => new RsurGetMarksDto
            {
                ParticipTestId = s.Id,
                Fio = s.RsurParticip.Surname + " " + s.RsurParticip.Name + " " + s.RsurParticip.SecondName,
                TestNumberCodeWithName = s.RsurTest.Test.NumberCode + " - " + s.RsurTest.Test.Name.Trim(),
                //TODO: realize MarksNames
                Marks = s.RsurTestResult.RsurQuestionValues
            });

            return result.SingleOrDefault();

            //var res = from participTest in _participTestRepository.GetAll()
            //          where participTest.Id == participTestId
            //          join particips in _participRepository.GetAll() on participTest.RsurParticipCode equals particips.Code
            //          join a in _resultRepository.GetAll() on participTest.Id equals a.RsurParticipTestId
            //          into b
            //          from result in b.DefaultIfEmpty()
            //          select new RsurGetMarksDto
            //          {
            //              ParticipTestId = participTest.Id,
            //              Fio = particips.Surname + " " + particips.Name + " " + particips.SecondName,
            //              TestNumberCodeWithName = participTest.RsurTest.Test.NumberCode + " - " + participTest.RsurTest.Test.Name.Trim(),
            //              //TODO: realize MarksNames
            //              Marks = result == null ? null : result.RsurQuestionValues
            //          };

            //return res.SingleOrDefault();
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
    }
}
