using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Monit95App.Domain.Core
{
    public class CollectorSchoolInfo
    {
        public SchoolBaseInfo schoolBaseInfo { get; set; }
        public string StatusName { get; set; }           
        
        public CollectorSchoolInfo()
        {
            schoolBaseInfo = new SchoolBaseInfo();
        }       
    }
}