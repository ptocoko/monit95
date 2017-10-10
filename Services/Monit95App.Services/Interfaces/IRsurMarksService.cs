using Monit95App.Services.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.Interfaces
{
    public interface IRsurMarksService
    {
        RsurGetMarksDto GetByParticipTestId(int participTestId);
        IEnumerable<RsurParticipMarksListDto> GetByAreaCodeAndRsurTestId(int areaCode, int rsurTestId);
        void AddOrUpdateMarks(int participTestId, string marks);
    }
}
