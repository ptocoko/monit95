using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Monit95App.Services.Interfaces;

namespace Monit95App.Services
{
    public class MarksFileService : IMarksFileService
    {
        public string CollectFolder { get; set; }

        public MarksFileService(string collectFolder)
        {
            CollectFolder = collectFolder;
        }

        public void SaveAsync(HttpPostedFile httpPostedFile, string userName)
        {
            var fileExten = Path.GetExtension(httpPostedFile.FileName);
            var fileName = $"{userName}{fileExten}";
            var fullFileName = Path.Combine(CollectFolder, fileName);

            httpPostedFile.SaveAs(fullFileName);
        }

        public Task<bool> IsExist(string userName)
        {

            return Task.Run(() =>
            {

                var filenames = Directory.GetFiles(CollectFolder, "*.xlsx")
                                  .Select(x => Path.GetFileNameWithoutExtension(x)).ToList();

                return true;
            });

        }
    }
}
