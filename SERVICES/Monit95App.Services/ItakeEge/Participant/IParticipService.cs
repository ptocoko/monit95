using System.Collections.Generic;

namespace Monit95App.Services.ItakeEge.Participant
{
    public interface IParticipService
    {
        int Add(ParticipPostDto dto, string schoolId, string dataSource);

        IEnumerable<ParticipGetViewDto> GetAllParticipantsByArea(int areaCode);

        IEnumerable<ParticipGetViewDto> GetAllParticipantsBySchool(string schoolId);

        ParticipPostDto GetById(int participId);
        void Update(int id, ParticipPostDto dto);
        void Delete(int participId);
    }
}
