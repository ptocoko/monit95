using Monit95App.Services.Work.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Monit95App.Domain.Core;
using MailRuCloudApi;

namespace Monit95App.Services.Work.Concrete
{
    public class SchoolReportFileNameOnline : ISchoolReportFileNameSource
    {
        public IEnumerable<string> GetFileNames(School school)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<string> GetFileNames(string _schoolId)
        {
            return GetFileNamesFromCloud(_schoolId).Result;
        }
        private async Task<IEnumerable<string>> GetFileNamesFromCloud(string _schoolId)
        {
            //Account account = new Account("chr_coko.pto@mail.ru", "coko95");
            var api = new MailRuCloud();
            api.Account = new Account("chr_coko.pto@mail.ru", "coko95");
            var privateItems = await api.GetItems($@"/Reports/{_schoolId}"); //from private account           
            //var publicItems = await api.GetItems($@"/Reports/2000"); //from public account                       
            //privateItems.Files.AddRange(publicItems.Files);

            return privateItems.Files.Select(x => x.Name).ToList();
        }
                
    }
}
