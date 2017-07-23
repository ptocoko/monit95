using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Monit95App.Domain.Core;

namespace Monit95App.Services.Models.Rsur
{
    public class RsurParticipFullInfo : RsurParticipInfo
    {        
        public string AreaName { get; set; }        

        public RsurParticipFullInfo(ProjectParticip entity) : base(entity)
        {
           
        }

        protected override void FillAdditionalInfo(ProjectParticip entity)
        {
            AreaName = entity.School.Area.Name;
        }
    }
}
