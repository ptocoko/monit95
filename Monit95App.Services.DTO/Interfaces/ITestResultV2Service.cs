using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.DTO.Interfaces
{
    public interface ITestResultV2Service
    {
        Task<TestResultV2Dto> GetByMarkIdAsync(int exerciseMarkId);
    }
}
