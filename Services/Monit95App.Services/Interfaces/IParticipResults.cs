using Monit95App.Services.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.Interfaces
{
    public interface IParticipResults
    {
        ClassParticipReport GetClassParticipReportDto(int participTestId);
        IEnumerable<ClassParticipReport> GetListClassParticipReportDto(ICollection<int> participTestIds);
    }
}
