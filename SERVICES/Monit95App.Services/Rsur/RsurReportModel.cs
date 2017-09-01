using System;
using System.Collections.Generic;

namespace Monit95App.Services.Rsur
{
    using Monit95App.Services.DTOs;

    public class RsurReportModel
    {
        #region Properties

        public DateTime ReportCreatedDate { get; set; } //dd.mm.yyyy
        public string ReportName { get; set; }        
        public List<RsurParticipPostDto> RsurParticipFullInfos { get; set; } = new List<RsurParticipPostDto>();

        #endregion

        #region Methods
       
        #endregion
    }
}


