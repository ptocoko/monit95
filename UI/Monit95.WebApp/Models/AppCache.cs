using Monit95App.Services;
using Monit95App.Services.SchoolFiles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Caching;
using System.Web;

namespace Monit95App.Models
{
    public class AppCache
    {
        public IEnumerable<ReportModel> GetReportMetas(string _schoolId)
        {
            MemoryCache memoryCache = MemoryCache.Default;
            return memoryCache.Get(_schoolId.ToString()) as List<ReportModel>;            
        }

        public bool AddReportMetas(IEnumerable<ReportModel> list, string _schoolId)
        {            
            MemoryCache memoryCache = MemoryCache.Default;
            return memoryCache.Add(_schoolId, list, DateTime.Now.AddMinutes(10));      
        }
    }
}