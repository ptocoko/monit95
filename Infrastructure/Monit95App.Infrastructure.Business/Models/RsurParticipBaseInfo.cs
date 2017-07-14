using Monit95App.Infrastructure.Business.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using Monit95App.Domain.Core;

namespace Monit95App.Infrastructure.Business.Models
{
    public class RsurParticipBaseInfo : RsurParticipInfo
    {
        public RsurParticipBaseInfo() { }

        public RsurParticipBaseInfo(ProjectParticip entity) : base(entity) { }

        protected override void FillAdditionalInfo(ProjectParticip entity) { }
    }
}