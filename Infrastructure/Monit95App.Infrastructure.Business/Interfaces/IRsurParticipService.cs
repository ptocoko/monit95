﻿using Monit95App.Infrastructure.Business.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Infrastructure.Business.Interfaces
{
    public interface IRsurParticipService
    {
        void UpdateAsync(RsurParticipModel model);
    }
}
