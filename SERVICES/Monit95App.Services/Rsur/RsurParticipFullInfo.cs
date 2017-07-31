using Monit95App.Domain.Core;
using Monit95App.Domain.Interfaces;

namespace Monit95App.Services.Rsur
{
    public class RsurParticipFullInfo : RsurParticipInfo
    {        
        public string AreaName { get; set; }        

        public bool HasSurnameEdit { get; set; }
        public bool HasNameEdit { get; set; }

        protected override void FillAdditionalInfo(ProjectParticip entity)
        {
            AreaName = $"{entity.School.Area.Code} - {entity.School.Area.Name.Trim()}";

            HasSurnameEdit = entity.ProjectParticipEdit.Surname == null;
            HasNameEdit = entity.ProjectParticipEdit.Name == null;
        }
    }
}
