using Monit95App.Domain.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Service.Interfaces
{
    public interface IClassService
    {
        List<Class> GetAll();
        string GetId(string className);
        string GetName(string classCode);
    }
}
