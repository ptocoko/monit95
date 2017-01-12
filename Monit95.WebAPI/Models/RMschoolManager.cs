using MailRuCloudApi;
using Monit95App.Domain.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Monit95App.Services.FileManager;
using System.IO;

namespace Monit95.WebAPI.Models
{
  
    public class RMschoolManager
    {
        private cokoContext cokoDb;
        private monit95Context monit95Db;
        
        private IEnumerable<string> GetFileNamesFromFileSystem(string _schoolID)
        {            
            var fileList1 = Directory.GetFiles($@"\\192.168.88.254\Reports\{_schoolID}");
            var fileList2 = Directory.GetFiles(@"\\192.168.88.254\Reports\2000");
            fileList1.ToList().AddRange(fileList2);
            var union = fileList1.ToList();
            var fileNames = union.Select(x => Path.GetFileName(x));

            return fileNames;
        }        
        public IEnumerable<RMschool> GetRMschoolList(string _schoolId)
        {                        
            //var fileNames = GetFileNamesFromMailCloud(_schoolId);
            var fileNames = GetFileNamesFromFileSystem(_schoolId);
            var reportFileMetas = FileManager.ParseArrayFileNamesToReportFileMetas(fileNames.ToArray());
            school currentSchool = cokoDb.schools.Find(_schoolId);
            ReportMeta reportMeta = null;

            int reportCode = 0;
            List<RMschool> result = new List<RMschool>();
            foreach (var reportFileMeta in reportFileMetas) 
            {
                reportCode = reportFileMeta.reportCode;
                reportMeta = monit95Db.ReportMetas.Find(reportCode);
                result.Add(new RMschool
                {
                    code = reportMeta.code,
                    name = reportMeta.name,
                    ProjectName = reportMeta.ProjectName,
                    year = reportMeta.year,
                    WWWref = reportFileMeta.schoolId.Equals("2000") ? $@"https://cloud.mail.ru/public/2TP2/UAdxpfhuB/{reportFileMeta.fileName}" :
                                                                      $@"{currentSchool.ReportLink}/{reportFileMeta.fileName}"
                });
            }

            return result;
        }

        private async Task<IEnumerable<string>> GetFileNamesFromMailCloud(string _schoolID)
        {
            //Account account = new Account("chr_coko.pto@mail.ru", "coko95");
            var api = new MailRuCloud();
            api.Account = new Account("chr_coko.pto@mail.ru", "coko95");
            var privateItems = await api.GetItems($@"/Reports/{_schoolID}"); //from private account           
            var publicItems = await api.GetItems($@"/Reports/2000"); //from public account                       
            privateItems.Files.AddRange(publicItems.Files);

            return privateItems.Files.Select(x => x.Name).ToList();
        }
        public RMschoolManager()
        {
            cokoDb = new cokoContext();
            monit95Db = new monit95Context();
        }
    }

}