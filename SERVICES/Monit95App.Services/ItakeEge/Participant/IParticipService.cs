using System.Collections.Generic;

namespace Monit95App.Services.ItakeEge.Participant
{
    public interface IParticipService
    {
        int Add(ParticipPostOrPutDto dto, string schoolId, string dataSource, int projectId);

        //IEnumerable<ParticipGetViewDto> GetAllParticipantsByArea(int areaCode);

        IEnumerable<ParticipGetViewDto> GetAllParticipantsBySchool(string schoolId, int projectId);        

        void Update(int id, string schoolId, ParticipPostOrPutDto dto);

        void Delete(int id, string schoolId);
    }
}
