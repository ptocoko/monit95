using Monit95App.Domain.Mark.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Monit95App.Domain.Mark
{
    public class MarksFileService : IMarksFileService
    {
        public string _collectFolder { get; set; }

        public MarksFileService(string collectFolder)
        {
            this._collectFolder = collectFolder;
        }

        public void SaveAsync(HttpPostedFile httpPostedFile, string userName)
        {

            var fileExten = Path.GetExtension(httpPostedFile.FileName);
            var fileName = $"{userName}{fileExten}";
            var fullFileName = Path.Combine(_collectFolder, fileName);

            httpPostedFile.SaveAs(fullFileName);

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
