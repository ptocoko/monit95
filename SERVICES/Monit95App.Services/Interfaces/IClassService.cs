using System.Collections.Generic;
using Monit95App.Domain.Core;

namespace Monit95App.Services.Interfaces
{
    public interface IClassService
    {
        List<Class> GetAll();
        string GetId(string className);
        string GetName(string classCode);
    }
}
