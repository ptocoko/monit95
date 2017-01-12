using Monit95App.Domain.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.IO;
using MailRuCloudApi;
using Monit95App.Services.Work.Abstract;

namespace Monit95App.Services.Work.Concrete
{  
    public class ReportMetaHandler
    {
        private readonly cokoContext cokoDb = new cokoContext();        
        private readonly ISchoolReportFileNameSource iFileNames;
             
        public IEnumerable<ReportMeta> GetPrivateReportMetas(School _school)
        {
            var reportFileNames = iFileNames.GetFileNames(_school);
            return new List<ReportMeta>();
        } 
        public IEnumerable<ReportMeta> GetOnlineReports(School _school)
        {                                    
            var reportFileNames = iFileNames.GetFileNames(_school);            
            var reportFileNamesMetadata = FileManager.FileManager.ParseArrayFileNamesToReportFileMetas(reportFileNames.ToArray());            

            School currentSchool = cokoDb.Schools.Find(_school);
            Report report = null;            
            string reportFileName = string.Empty;
            List<ReportMeta> resultOnlineReports = new List<ReportMeta>();
            foreach (var reportFileNameMetadata in reportFileNamesMetadata) 
            {
                reportFileName = reportFileNameMetadata.fileName;
                report = cokoDb.Reports.Find(reportFileNameMetadata.reportCode);
                resultOnlineReports.Add(new ReportMeta
                {
                    Id = report.Id,
                    Name = report.Name,
                    ProjectName = report.ProjectName,
                    Year = report.Year,
                    Link = reportFileNameMetadata.schoolId.Equals("2000") ? $@"https://cloud.mail.ru/public/2TP2/UAdxpfhuB/{reportFileName}" :
                                                                            $@"{currentSchool.ReportLink}/{reportFileName}"
                });
            }
            return resultOnlineReports;
        }
        public ReportMetaHandler(ISchoolReportFileNameSource _fileNames)
        {
            iFileNames = _fileNames;                        
        }
    }

}