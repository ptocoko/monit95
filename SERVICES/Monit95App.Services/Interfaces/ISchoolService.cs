using Monit95App.Services.School;

namespace Monit95App.Services.Interfaces
{
    using System.Collections.Generic;

    using Monit95App.Services.DTOs;

    public interface ISchoolService
    {
        SchoolDto GetModel(string id);

        IEnumerable<SchoolDto> GetAll();

        IEnumerable<SchoolDto> GetByAreaCode(int areaCode);

        void Update(string schoolId, SchoolDto dto, bool isAdmin);
    }
}
