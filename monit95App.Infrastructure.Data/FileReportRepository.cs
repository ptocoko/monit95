using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Monit95App.Infrastructure.Data
{
    public class FileReportRepository
    {
        ////string server_ip = @"\\192.168.88.220";
        //private string rep_path = @"C:\PTO_Cloud Mail.Ru\Reports";
        //private monit95Context db;
        //public FileReportRepository(monit95Context db)
        //{
        //    this.db = db;
        //}

        ////public List<school> GetSchoolListForReport(Report _report)
        ////{
        ////    List<school> result = new List<school>();
        ////    string fullPath = 

        ////    return result;
        ////}

        //public void CopyFilesToRepository(string source)
        //{

        //}
        //public List<Report> GetReportListForSchool(school _school)
        //{
        //    List<Report> result = new List<Report>();
        //    //foreach(var report in db.Reports)
        //    //{                
        //    //    string catalog = String.Format(@"{0}\{1} - {2}", report.path, _school.AreaID, _school.area.AreaName);
        //    //    catalog = catalog.Replace(@"\\", @"\");                
        //    //    Console.WriteLine(catalog);
        //    //    string[] rarFiles = Directory.GetFiles(catalog, "*.rar")
        //    //                                 .Select(path => Path.GetFileName(path).Substring(1, 4))
        //    //                                 .ToArray(); //получить список rar-файлов, т.е. коды школ
        //    //    if (Array.IndexOf(rarFiles, _school.SchoolID) != -1)
        //    //    {
        //    //        result.Add(report);
        //    //    }                 
                    
        //    //}

        //    return result;
        //}

        //public Report GetReport(string code)
        //{
        //    return db.Reports.Find(code);
        //}
        //public void Save()
        //{
        //    db.SaveChanges();
        //}
        //private bool disposed = false;
        //public virtual void Dispose(bool disposing)
        //{
        //    if(!this.disposed)
        //    {
        //        if(disposing)
        //        {
        //            db.Dispose();
        //        }
        //    }
        //    this.disposed = true;
        //}
        //public void Dispose()
        //{
        //    Dispose(true);
        //    GC.SuppressFinalize(this);
        //}
    }
}
