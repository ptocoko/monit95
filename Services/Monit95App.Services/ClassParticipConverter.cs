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

        public ClassParticipConverter(string schoolId, int projectCode)
        {
            var mapperConfig = new MapperConfiguration(cfg => cfg.CreateMap<ClassParticip, ParticipDto>()
                                                                  .AfterMap((source, dest) => {
                                                                      dest.SchoolId = schoolId;
                                                                      dest.ProjectCode = projectCode;
                                                                  }));

            _mapper = mapperConfig.CreateMapper();
        }

        public ParticipDto ConvertToParticipDto(ClassParticip classParticip)
        {
            if (classParticip == null) throw new ArgumentNullException(nameof(classParticip));

            var participDto = _mapper.Map<ParticipDto>(classParticip);

            var validContext = new System.ComponentModel.DataAnnotations.ValidationContext(participDto);
            Validator.ValidateObject(participDto, validContext, true);

            return participDto;
        }

        public IEnumerable<ParticipDto> ConvertToParticipDto(IEnumerable<ClassParticip> classParticips)
        {
            List<ParticipDto> particips = new List<ParticipDto>();
            foreach (var classParticip in classParticips)
                particips.Add(ConvertToParticipDto(classParticip));

            return particips;
        }
    }
}
