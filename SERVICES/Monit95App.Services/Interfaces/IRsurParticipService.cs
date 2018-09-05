using System.Collections.Generic;

namespace Monit95App.Services.Interfaces
{
    using Monit95App.Services.DTOs;
    using Monit95App.Services.Rsur;
    using Monit95App.Services.Rsur.Particip;

    public interface IRsurParticipService
    {
        int Add(ParticipAddDto dto); // return code

        RsurParticipGetDto GetByCode(int code);

        IEnumerable<RsurParticipGetDto> GetAll(int? areaCode = null, string schoolId = null);

        IEnumerable<RsurParticipGetDto> Search(SearchOptions options);

        void Update(int code, RsurParticipPutDto dto);

        void Delete(int code);
    }
}

