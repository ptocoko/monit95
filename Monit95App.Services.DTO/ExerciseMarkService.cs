using Monit95App.Domain.Core;
using Monit95App.Domain.Interfaces;
using Monit95App.Services.DTO.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.DTO
{
    public class ExerciseMarkService : IExerciseMarkService
    {
        private IUnitOfWork _unitOfWork;
        private IRepositoryV2<ExerciseMark> _exerciseMarkRep;

        public ExerciseMarkService(IUnitOfWork unitOfWork, 
                                   IRepositoryV2<ExerciseMark> exerciseMarkRep)
        {
            _unitOfWork = unitOfWork;
            _exerciseMarkRep = exerciseMarkRep;
        }

        public Task<ExerciseMarkDto> AddAsync(ExerciseMarkDto dto)
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

        public Task<List<ExerciseMarkDto>> GetBySchoolIdAsync(string schoolId) //R
        {                     
            return Task.Run(() =>
            {
                //C0AAE792-9EE5-4A9F-B8CD-03AEF37032E1 - 1 класс, русский язык
                //CCE3AB81-F9CC-4139-AF54-2A6E3E287D86 - 2 класс, русский язык
                //BB55D9EE-4177-4FB9-B825-7BE22455B626 - 3 класс, русский язык
                var dto = new List<ExerciseMarkDto>();

                var tests = new string[] { "C0AAE792-9EE5-4A9F-B8CD-03AEF37032E1", "CCE3AB81-F9CC-4139-AF54-2A6E3E287D86", "BB55D9EE-4177-4FB9-B825-7BE22455B626" };
                var res = _exerciseMarkRep.GetAll()
                                         .Where(x => x.ProjectParticipsV2.SchoolId == schoolId && tests.Contains(x.TestId.ToString()))
                                         .Select(s => new ExerciseMarkDto { Id = s.Id, ProjectParticipId = s.ProjectParticipId, TestId = s.TestId.ToString(), Marks = s.Marks })
                                         .ToList();
                dto.AddRange(res);

                return dto;
            });           
        }

        public Task<bool> UpdateAsync(ExerciseMarkDto marks)
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
