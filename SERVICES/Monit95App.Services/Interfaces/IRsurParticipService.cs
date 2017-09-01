using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Monit95App.Services.Models;
using Monit95App.Services.Rsur;
using Monit95App.Domain.Core;

namespace Monit95App.Services.Interfaces
{
    using Monit95App.Services.DTOs;

    public interface IRsurParticipService
    {
        string Add(RsurParticipPostDto dto); // return code
    }
}

