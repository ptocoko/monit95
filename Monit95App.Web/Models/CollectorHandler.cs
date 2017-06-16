using Monit95App.Domain.Core;
using Monit95App.Models.Abstarct;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.IO.Abstractions;
using System.Linq;
using System.Web;

namespace Monit95App.Models
{
    public class CollectorHandler
    {        
        private readonly IFolderSchoolIds iFolderSchoolIds;
        private readonly int collectorId; //e.g.: id = 201650
        private readonly string folder;
        private readonly cokoContext cokoDbContext;

        public CollectorHandler(int _collectorId, IFolderSchoolIds _iFolderSchoolIds, cokoContext _cokoDbContext) 
        {            
            this.iFolderSchoolIds = _iFolderSchoolIds;
            this.collectorId = _collectorId;
            this.cokoDbContext = _cokoDbContext;
            this.folder = $@"~/Files/{collectorId}/collector";            
        }

        //public void UpdateCollectorSchools() //update table "CollectorSchools" in DB
        //{            
        //    var folderSchoolIds = iFolderSchoolIds.GetFolderSchoolIds(folder);
        //    var collectSchools = cokoDbContext.CollectorSchools.Where(x => x.CollectorId == collectorId);
        //    foreach(var collectSchool in collectSchools)
        //    {
        //        collectSchool.StatusCode = 0;
        //    }
        //    var collectFolderSchools = collectSchools.Where(x => folderSchoolIds.Contains(x.SchoolId));
        //    foreach (var collectFolderSchool in collectFolderSchools)
        //    {
        //        collectFolderSchool.StatusCode = 1;
        //    }
        //}
    }
}