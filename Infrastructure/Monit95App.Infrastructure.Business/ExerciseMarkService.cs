using Monit95App.Domain.Core;
using Monit95App.Domain.Interfaces;
using Monit95App.Infrastructure.Business.Interfaces;
using Monit95App.Infrastructure.Business.Protocols;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Infrastructure.Business
{
    public class ExerciseMarkService : IExerciseMarkService
    {
        private IUnitOfWork _unitOfWork;
        private IGenericRepository<ExerciseMark> _exerciseMarkRep;
        private IGenericRepository<Test> _testRep;

        public ExerciseMarkService(IUnitOfWork unitOfWork, 
                                   IGenericRepository<ExerciseMark> exerciseMarkRep, IGenericRepository<Test> testRep)
        {
            _unitOfWork = unitOfWork;
            _exerciseMarkRep = exerciseMarkRep;
            _testRep = testRep;
        }

        public Task<ExerciseMarkModel> AddAsync(ExerciseMarkModel dto)
        {
            return Task.Run(() =>
            {
                if (dto != null)
                {
                    var newEntity = new ExerciseMark
                    {
                        ProjectParticipId = dto.ProjectParticipId,
                        TestId = new Guid(dto.TestId),
                        Marks = dto.Marks                       
                    };

                    _exerciseMarkRep.Insert(newEntity);
                    _unitOfWork.Save();

                    dto.Id = newEntity.Id;
                }

                return dto;
            });
        } //C

        public Task<List<ExerciseMarkModel>> GetBySchoolIdAsync(string schoolId, string [] tests) //R
        {                     
            return Task.Run(() =>
            {
                //C0AAE792-9EE5-4A9F-B8CD-03AEF37032E1 - 1 класс, русский язык
                //CCE3AB81-F9CC-4139-AF54-2A6E3E287D86 - 2 класс, русский язык
                //BB55D9EE-4177-4FB9-B825-7BE22455B626 - 3 класс, русский язык

                //6AD11617-1BCD-4DFF-886E-3CCAFE13C3F1 - 1 класс, математика
                //14815A91-BB55-4030-9BF9-ECD1D8B2F99E - 2 класс, математика
                //5D16AC39-4FE0-4392-9612-7E256EA1BEBB - 3 класс, математика

                //BD0B538F-A937-4BF7-8302-77A8B225D60D - 1 класс, чтение
                //D6554110-E07A-4783-B371-04A46E32467B - 2 класс, чтение
                //FDA1B01B-63AB-44A6-A976-D5B60E59BE5E - 3 класс, чтение
                var dto = new List<ExerciseMarkModel>();

                var res = _exerciseMarkRep.GetAll()
                                         .Where(x => x.ProjectParticipsV2.SchoolId == schoolId && tests.Contains(x.TestId.ToString()))
                                         .Select(s => new ExerciseMarkModel { Id = s.Id, ProjectParticipId = s.ProjectParticipId, TestId = s.TestId.ToString(), Marks = s.Marks })
                                         .ToList();
                dto.AddRange(res);

                return dto;
            });           
        }

        public Task<List<MaxRatesDto>> GetMaxRates(string[] testIds)
        {
            return Task.Run(() =>
            {
                var result = new List<MaxRatesDto>();
                foreach (var testid in testIds)
                {
                    var maxMarks = _testRep.GetAll().SingleOrDefault(p => p.Id == new Guid(testid)).ExcerMaxMarks.Split(new char[] { ';' });
                    result.Add(new MaxRatesDto { TestId = testid, MaxRates = maxMarks });
                }
                return result;
            });
        }

        public Task<bool> UpdateAsync(ExerciseMarkModel marks)
        {
            return Task.Run(() =>
            {
                if (marks != null && marks.Id != 0)
                {
                    var entity = _exerciseMarkRep.GetById(marks.Id);
                    entity.Marks = marks.Marks;

                    _unitOfWork.Save();
                }

                return true;
            });
        }
    }
}
