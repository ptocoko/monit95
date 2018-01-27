using System.Collections.Generic;

namespace Monit95App.Services.ItakeEge.Participant
{
    public interface IParticipService
    {
        int Add(ParticipPostOrPutDto dto, string schoolId, string dataSource);

        IEnumerable<ParticipGetViewDto> GetAllParticipantsByArea(int areaCode);

        IEnumerable<ParticipGetViewDto> GetAllParticipantsBySchool(string schoolId);

        ParticipPostOrPutDto GetById(int participId);
        void Update(int id, ParticipPostOrPutDto dto);
        void Delete(int participId);
    }
}
