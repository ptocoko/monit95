using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace element.Models
{
    public class ReportProperty
    {
        public int reportCode;
        
        public int SubjectCode {get;set;}        

        private int areaID;         
        public int AreaID 
        {
            get
            {
                return areaID;
            }
            set
            {
                areaID = value;
                reportCode = 2;
            }
        }
        private int schoolCode;
        public int SchoolCode
        {
            get
            {
                return schoolCode;
            }
            set
            {
                schoolCode = value;
                reportCode = 3;
            }
         
        }
        private string participanID;
        public string ParticipantID
        {
            get
            {
                return participanID;
            }
            set
            {
                participanID = value;
                reportCode = 5;
            }
        }
        public ReportProperty()
        {
            reportCode = 1;
        }
    }
}
