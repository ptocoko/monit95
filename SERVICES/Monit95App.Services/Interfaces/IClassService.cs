using System.Collections.Generic;
using Monit95App.Domain.Core;
using Monit95App.Domain.Core.Entities;

namespace Monit95App.Services.Interfaces
{
    public interface IClassService
    {
        IEnumerable<Class> GetAll();
        string GetId(string className);
        string GetName(string classCode);
    }
}
