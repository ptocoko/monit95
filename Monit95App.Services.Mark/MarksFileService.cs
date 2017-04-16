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
        private string _collectFolder { get; }

        public MarksFileService(string collectFolder)
        {
            collectFolder = _collectFolder;
        }

        public Task SaveAsync(HttpPostedFile httpPostedFile, string userName)
        {            
            var fileExten = Path.GetExtension(httpPostedFile.FileName);
            var fileName = $"{userName}.{fileExten}";
            var fullFileName = Path.Combine(_collectFolder, fileName);
            
            return Task.Run(() =>
            {
                httpPostedFile.SaveAs(fullFileName);
            });            
        }

        public Task<bool> IsExist(string userName)
        {

            return Task.Run(() =>
            {

                var filenames = Directory.GetFiles(_collectFolder, "*.xlsx")
                                  .Select(x => Path.GetFileNameWithoutExtension(x)).ToList();

                return true;
            });

        }
    }
}
