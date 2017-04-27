using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.DTO.Interfaces
{
    public interface IOneTwoThreeReportService
    {
        Task<OneTwoThreeReportDto> GetReportByParticipIdAsync(int participId, string[] tests);
    }
}
