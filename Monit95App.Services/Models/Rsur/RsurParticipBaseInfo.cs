using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using Monit95App.Domain.Core;

namespace Monit95App.Services.Models.Rsur
{
    public class RsurParticipBaseInfo : RsurParticipInfo
    {        
        public RsurParticipBaseInfo(ProjectParticip entity) : base(entity) { }

        protected override void FillAdditionalInfo(ProjectParticip entity) { }
    }
}