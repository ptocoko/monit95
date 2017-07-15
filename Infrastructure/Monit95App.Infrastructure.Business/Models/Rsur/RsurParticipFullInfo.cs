using Monit95App.Infrastructure.Business.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Monit95App.Domain.Core;
using Monit95App.Infrastructure.Business.Interfaces.Rsur;

namespace Monit95App.Infrastructure.Business.Models.Rsur
{
    public class RsurParticipFullInfo : RsurParticipInfo
    {        
        public string AreaName { get; set; }

        public RsurParticipFullInfo() { }

        public RsurParticipFullInfo(ProjectParticip entity) : base(entity)
        {
            FillAdditionalInfo(entity);
        }

        protected override void FillAdditionalInfo(ProjectParticip entity)
        {
            AreaName = entity.School.Area.Name;
        }
    }
}
