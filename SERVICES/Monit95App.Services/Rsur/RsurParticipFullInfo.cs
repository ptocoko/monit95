using Monit95App.Domain.Core;

namespace Monit95App.Services.Rsur
{
    public class RsurParticipFullInfo : RsurParticipInfo
    {        
        public string AreaName { get; set; }        

        protected override void FillAdditionalInfo(ProjectParticip entity)
        {
            AreaName = entity.School.Area.Name;
        }
    }
}
