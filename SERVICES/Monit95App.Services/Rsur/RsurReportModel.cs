using System;
using System.Collections.Generic;

namespace Monit95App.Services.Rsur
{
    using Monit95App.Services.DTOs;
    using Monit95App.Services.Rsur.Particip;

    public class RsurReportModel
    {
        #region Properties

        public DateTime ReportCreatedDate { get; set; } //dd.mm.yyyy
        public string ReportName { get; set; }        
        public List<ParticipAddDto> RsurParticipFullInfos { get; set; } = new List<ParticipAddDto>();

        #endregion

        #region Methods
       
        #endregion
    }
}


