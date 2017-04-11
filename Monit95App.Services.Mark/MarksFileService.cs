using Monit95App.Services.Mark.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Monit95App.Services.Mark
{
    public class MarksFileService : IMarksFileService
    {
        public Task SaveAsync(HttpPostedFile httpPostedFile, string userName)
        {
            var serverPath = "d:";
            var fileExten = Path.GetExtension(httpPostedFile.FileName);
            var fileName = $"{userName}.{fileExten}";
            var fullFileName = Path.Combine(serverPath, fileName);
            
            return Task.Run(() =>
            {
                httpPostedFile.SaveAs(fullFileName);
            });
            
        }
    }
}
