using AutoMapper;
using Monit95App.Services.Interfaces;
using Monit95App.Services.Models;
using System;
using System.Collections.Generic;
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

            return _mapper.Map<ParticipDto>(classParticip);
        }
    }
}
