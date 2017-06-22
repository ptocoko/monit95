using Monit95App.Domain.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Infrastructure.Data.Interfaces
{
    public interface IPParticipCodeCreator
    {
        //Метод возвращает код участника для нового участника
        string FactoryMethod(ProjectParticip newEntity);
    }
}
