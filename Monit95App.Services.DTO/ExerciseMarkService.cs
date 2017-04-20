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
    public class ExerciseMarkService  //IExerciseMarkService
    {
        private IUnitOfWork _unitOfWork;
        private IRepositoryV2<ExerciseMark> _exerciseMarkRep;
        private IRepositoryV2<ProjectParticipsV2> _projectParticipV2Rep;

        public ExerciseMarkService(IUnitOfWork unitOfWork, 
                                   IRepositoryV2<ExerciseMark> exerciseMarkRep,
                                   IRepositoryV2<ProjectParticipsV2> projectParticipV2Rep)
        {
            _unitOfWork = unitOfWork;
            _exerciseMarkRep = exerciseMarkRep;
            _projectParticipV2Rep = projectParticipV2Rep;
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
                        TestId = dto.TestId,
                        Marks = dto.Marks                       
                    };

                    _exerciseMarkRep.Insert(newEntity);
                    _unitOfWork.Save();

                    dto.Id = newEntity.Id;
                }

                return dto;
            });
        } //C

        public Task<List<ExerciseMarkDto>> GetBySchoolIdAndTestIdAsync(string schoolId) //R
        {                     
            return Task.Run(() =>
            {
                //C0AAE792-9EE5-4A9F-B8CD-03AEF37032E1 - 1 класс, русский язык
                //CCE3AB81-F9CC-4139-AF54-2A6E3E287D86 - 2 класс, русский язык
                //BB55D9EE-4177-4FB9-B825-7BE22455B626 - 3 класс, русский язык

                var s1 = _exerciseMarkRep.GetAll().Where(x => x.ProjectParticipsV2.SchoolId == schoolId && x.TestId.ToString() == "C0AAE792-9EE5-4A9F-B8CD-03AEF37032E1");
                var s2 = _exerciseMarkRep.GetAll().Where(x => x.ProjectParticipsV2.SchoolId == schoolId && x.TestId.ToString() == "CCE3AB81-F9CC-4139-AF54-2A6E3E287D86");
                var s3 = _exerciseMarkRep.GetAll().Where(x => x.ProjectParticipsV2.SchoolId == schoolId && x.TestId.ToString() == "BB55D9EE-4177-4FB9-B825-7BE22455B626");

                var schoolParticips = _projectParticipV2Rep.GetAll().Where(x => x.SchoolId == schoolId);
                var allClass1Particips = schoolParticips.Where(x => x.ClassCode.StartsWith("01"));
                //var hasMarksClass1Particips = allClass1Particips.Where
                var class2Particips = schoolParticips.Where(x => x.ClassCode.StartsWith("02"));
                var class3Particips = schoolParticips.Where(x => x.ClassCode.StartsWith("03"));
                var dtos = new List<ExerciseMarkDto>();

                foreach(var particip in allClass1Particips)
                {
                    var dto = new ExerciseMarkDto();
                    dto.Marks = "";
                    dto.Surname = particip.Surname;
                    dto.Name = particip.Name;
                    dto.SecondName = particip.SecondName;
                    dto.ClassName = particip.Class.Name;

                    //if (particip.ExerciseMarks.Where(x=>x.TestId.ToString() == "C0AAE792-9EE5-4A9F-B8CD-03AEF37032E1")) //if has marks
                    //{
                    //    dto.Id = particip.Exerc;
                    //    dto.ProjectParticipId = 
                        

                    //}
                }

                return dtos;
            });           
        }

        public Task<bool> UpdateAsync(ExerciseMarkDto marks)
        {
            throw new NotImplementedException();
        }
    }
}
