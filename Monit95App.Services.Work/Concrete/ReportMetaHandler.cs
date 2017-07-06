using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.IO;
using Monit95App.Domain.Work.Abstract;
using Monit95App.Domain.Core;
using Monit95App.Services.Work.Concrete;

namespace Monit95App.Domain.Work.Concrete
{  
    public class ReportMetaHandler
    {
        private readonly cokoContext cokoDb = new cokoContext();                
             
        public static IEnumerable<ReportMeta> GetReportMetasBySchool(School school, ISchoolReportFileNameSource iFileNames)
        {
            //TODO: здесь надо сделать Dependency Injection
            ITypeReport privateReportMeta = new PrivateReportMeta(school, iFileNames);
            ITypeReport protectReportMeta = new ProtectReportMeta(school);
            ITypeReport publicReportMeta = new PublicReportMeta();
            var p1 = privateReportMeta.GetReportMetas();
            var p2 = protectReportMeta.GetReportMetas();
            var p3 = publicReportMeta.GetReportMetas();
            var p1p2 = p1.Concat(p2);
            var schoolReportMetas = privateReportMeta.GetReportMetas()
                                    .Concat(protectReportMeta.GetReportMetas())
                                    .Concat(publicReportMeta.GetReportMetas());
            return schoolReportMetas;
        }
    }

}