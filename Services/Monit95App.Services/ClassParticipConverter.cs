using AutoMapper;
using Monit95App.Services.Interfaces;
using Monit95App.Services.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services
{
    public class ClassParticipConverter : IClassParticipConverter
    {
        private IMapper _mapper;

        public ClassParticipConverter()
        {
            var mapperConfig = new MapperConfiguration(cfg => cfg.CreateMap<ClassParticip, ParticipDto>());

            _mapper = mapperConfig.CreateMapper();
        }

        public ParticipDto ConvertToParticipDto(ClassParticip classParticip, string schoolId, int projectCode)
        {
            if (classParticip == null) throw new ArgumentNullException(nameof(classParticip));

            var participDto = _mapper.Map<ParticipDto>(classParticip);
            participDto.SchoolId = schoolId;
            participDto.ProjectCode = projectCode;

            var validContext = new System.ComponentModel.DataAnnotations.ValidationContext(participDto);
            Validator.ValidateObject(participDto, validContext, true);

            return participDto;
        }

        public IList<ParticipDto> ConvertToParticipDto(IList<ClassParticip> classParticips, string schoolId, int projectCode)
        {
            List<ParticipDto> particips = new List<ParticipDto>();
            foreach (var classParticip in classParticips)
                particips.Add(ConvertToParticipDto(classParticip, schoolId, projectCode));

            return particips;
        }
    }
}
