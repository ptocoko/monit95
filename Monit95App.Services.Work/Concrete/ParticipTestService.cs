using Monit95App.Domain.Core;
using Monit95App.Infrastructure.Data;
using Monit95App.Services.DTO;
using Monit95App.Services.Work.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.Work.Concrete
{
    public class ParticipTestService : IParticipTestService
    {
        private UnitOfWork uow;
        private IExerMarkDTOcreator _exerMarkDTOscreator;
        public ParticipTestService(cokoContext db, IExerMarkDTOcreator exerMarkDTOcreator)
        {
            uow = new UnitOfWork(db);
            _exerMarkDTOscreator = exerMarkDTOcreator;
        }   

        public void AddDto(ParticipTestDTO dto)
        {

        }
        public ParticipTestDTO GetDto(ParticipTest item)
        {
            var participTestDto = new ParticipTestDTO
            {
                ProjectCode = item.ProjectCode,
                TestId = item.TestId,
                TestNumber = item.TestNumber,
                TestDate = item.TestDate,
                ParticipCode = item.ParticipCode,
                ExerMarkDTOs = _exerMarkDTOscreator.FactoryMethod(item)
            };

            return participTestDto;  
        }
    }
}
