using Monit95App.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Monit95App.Domain.Core
{
    public class SchoolBaseInfo : ISchoolBaseInfo
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string AreaName { get; set; }          
    }
}