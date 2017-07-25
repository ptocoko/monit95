using ClosedXML.Excel;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.Models.Rsur
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


