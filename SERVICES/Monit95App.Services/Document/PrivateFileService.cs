using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.Document
{
    using System.IO;

    public class PrivateFileService : IPrivateFileService
    {
        private const string DocumentsRootFolderLink = @"\\192.168.88.254\Reports";

        public IEnumerable<string> GetFileNames(string schoolId)
        {
            _ = schoolId ?? throw new ArgumentNullException();

            var privateFileNames = Directory.GetFiles($@"{DocumentsRootFolderLink}\{schoolId}").Select(Path.GetFileName).ToList();
            if (!privateFileNames.Any())
            {
                throw new ArgumentException(nameof(schoolId));
            }

            return privateFileNames;
        }
    }
}
