using Monit95App.Domain.Core;
using Monit95App.Models.Abstarct;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace Monit95App.Models
{
    public class FolderSchoolIds : IFolderSchoolIds
    {
        private cokoContext cokoDb = new cokoContext();
        public IEnumerable<string> GetFolderSchoolIds(string folder)
        {
            var assumedFolderSchoolIds = Directory.GetFiles(folder).ToList()
                                                  .Select(x => Path.GetFileName(x).Substring(0, 4));
            var folderSchoolIds = cokoDb.Schools.Select(x => x.Id).ToList().Intersect(assumedFolderSchoolIds);
            return folderSchoolIds;
        }
    }
}