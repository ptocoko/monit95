using Monit95App.Domain.Core;
using Monit95App.Domain.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.Interfaces
{
    public interface IRsurParticipCodeCreator
    {
        //Метод возвращает код участника для нового участника
        string FactoryMethod(RsurParticip newEntity);
    }
}
