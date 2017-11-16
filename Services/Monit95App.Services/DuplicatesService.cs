using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using System.Security.Cryptography;

namespace Monit95App.Services
{
    public class DuplicatesService
    {
        public IEnumerable<string> GetNonDuplicateFiles(string[] fileNames, string distFolder)
        {
            List<string> hashes = new List<string>();
            byte[] hash;
            string hashString;
            foreach (var fileName in fileNames)
            {
                using (var md5 = MD5.Create())
                {
                    using (var stream = File.OpenRead(fileName))
                    {
                        hash = md5.ComputeHash(stream);
                        hashString = BitConverter.ToString(hash).ToLowerInvariant();
                    }
                }

                if (!hashes.Contains(hashString))
                {
                    hashes.Add(hashString);
                    File.Move(fileName, $"{distFolder}\\{Path.GetFileName(fileName)}");
                }
            }

            return Directory.GetFiles(distFolder);
        }
    }
}
