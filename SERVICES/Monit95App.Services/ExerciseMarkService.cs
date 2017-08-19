using Monit95App.Domain.Core;
using Monit95App.Domain.Core.Entities;
using Monit95App.Domain.Interfaces;
using Monit95App.Services.Interfaces;
using Monit95App.Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Monit95App.Services
{
    public class ExerciseMarkService : IExerciseMarkService
    {
        #region Fileds
        
        private readonly IGenericRepository<ExerciseMark> _exerciseMarkRepository;
        private readonly IGenericRepository<Test> _testRepository;

        #endregion

        #region Public methods

        public ExerciseMarkService(IGenericRepository<ExerciseMark> exerciseMarkRep)                                 
        {            
            _exerciseMarkRepository = exerciseMarkRep;            
        }

        public ExerciseMarkService(IGenericRepository<ExerciseMark> exerciseMarkRep, 
                                   IGenericRepository<Test> testRep)
        {            
            _exerciseMarkRepository = exerciseMarkRep;
            _testRepository = testRep;
        }

        #warning what about validate properties of model?
        public Task<ExerciseMarkModel> AddAsync(ExerciseMarkModel model)
        {
            return Task.Run(() =>
            {
                if (model != null)
                {
                    var newEntity = new ExerciseMark
                    {
                        ProjectParticipId = model.ProjectParticipId,
                        TestId = new Guid(model.TestId),
                        Marks = model.Marks                       
                    };

                    _exerciseMarkRepository.Insert(newEntity);
                    _exerciseMarkRepository.Save();                    

                    model.Id = newEntity.Id;
                    return model;
                }                
                throw new ArgumentNullException("model");
            });
        } //C

        public Task<List<ExerciseMarkModel>> GetBySchoolIdAsync(string schoolId, string [] tests) //R
        {                     
            return Task.Run(() =>
            {
                var dto = new List<ExerciseMarkModel>();

                var res = _exerciseMarkRepository.GetAll()
                                         .Where(x => x.Particip.SchoolId == schoolId && tests.Contains(x.TestId.ToString()))
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
                    var maxMarks = _testRepository.GetAll().SingleOrDefault(p => p.Id == new Guid(testid)).ExcerMaxMarks.Split(new char[] { ';' });
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
                    var entity = _exerciseMarkRepository.GetById(marks.Id);
                    entity.Marks = marks.Marks;

                    _exerciseMarkRepository.Save();
                }

                return true;
            });
        }

        #endregion
    }
}
