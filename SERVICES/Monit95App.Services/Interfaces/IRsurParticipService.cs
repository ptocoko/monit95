using System.Collections.Generic;

namespace Monit95App.Services.Interfaces
{
    using Monit95App.Services.DTOs;

    public interface IRsurParticipService
    {
        int Add(RsurParticipPostDto dto); // return code

        RsurParticipGetDto GetByCode(int code);

        IEnumerable<RsurParticipGetDto> GetAll(int? areaCode = null, string schoolId = null);

        void Update(int code, RsurParticipPutDto dto);

        void Delete(int code);
    }
}

