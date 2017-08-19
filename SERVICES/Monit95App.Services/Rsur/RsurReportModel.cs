﻿using System;
using System.Collections.Generic;
using Monit95App.Services.Models.Rsur;

namespace Monit95App.Services.Rsur
{
    public class RsurReportModel
    {
        #region Properties

        public DateTime ReportCreatedDate { get; set; } //dd.mm.yyyy
        public string ReportName { get; set; }        
        public List<RsurParticipFullInfo> RsurParticipFullInfos { get; set; } = new List<RsurParticipFullInfo>();

        #endregion

        #region Methods
       
        #endregion
    }
}

