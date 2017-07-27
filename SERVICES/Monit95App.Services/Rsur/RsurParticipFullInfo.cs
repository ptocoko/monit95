using Monit95App.Domain.Core;
using Monit95App.Domain.Interfaces;

namespace Monit95App.Services.Rsur
{
    public class RsurParticipFullInfo : RsurParticipInfo
    {        
        public string AreaName { get; set; }        

        protected override void FillAdditionalInfo(ProjectParticip entity)
        {
            AreaName = $"{entity.School.Area.Code} - {entity.School.Area.Name}";
        }

        public RsurParticipFullInfo()
        {

        }

        public RsurParticipFullInfo(IGenericRepository<ProjectParticipsEdit> rsurParticipEditRepository) : base(rsurParticipEditRepository)
        {

        }
    }
}
