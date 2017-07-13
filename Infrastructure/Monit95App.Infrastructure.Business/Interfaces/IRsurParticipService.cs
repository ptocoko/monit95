﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Monit95App.Infrastructure.Business.Models;

namespace Monit95App.Infrastructure.Business.Interfaces
{
    public interface IRsurParticipService
    {
        IEnumerable<RsurParticipBaseInfo> GetByUserName(string userName, string userRoles);
        RsurParticipBaseInfo GetByParticipCode(string participCode);
        bool Update(RsurParticipBaseInfo model);
        void Add(RsurParticipBaseInfo model);
        IEnumerable<IGrouping<string, ParticipResultsModel>> GetParticipResults(string participCode);
    }
}
