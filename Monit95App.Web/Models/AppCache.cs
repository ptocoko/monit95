using Monit95App.Services.Work.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Caching;
using System.Web;

namespace Monit95App.Models
{
    public class AppCache
    {
        public IEnumerable<ReportMeta> GetOnlineReports(string _schoolId)
        {
            MemoryCache memoryCache = MemoryCache.Default;
            return memoryCache.Get(_schoolId.ToString()) as List<ReportMeta>;            
        }

        public bool AddOnlineReports(IEnumerable<ReportMeta> list, string _schoolId)
        {            
            MemoryCache memoryCache = MemoryCache.Default;
            return memoryCache.Add(_schoolId, list, DateTime.Now.AddMinutes(10));      
        }
    }
}