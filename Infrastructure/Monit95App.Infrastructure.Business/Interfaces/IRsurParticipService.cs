using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Monit95App.Infrastructure.Business.Models;

namespace Monit95App.Infrastructure.Business.Interfaces
{
    public interface IRsurParticipService
    {
        bool Update(RsurParticipModel model);
        void Add(RsurParticipModel model);
    }
}
