using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using Monit95App.Domain.Core;
using Monit95App.Services.Rsur;

namespace Monit95App.Services.Models.Rsur
{
    public class RsurParticipBaseInfo : RsurParticipInfo
    {                        
        protected override void FillAdditionalInfo(ProjectParticip entity) { }
    }
}