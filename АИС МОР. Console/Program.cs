using Ionic.Zip;
using Microsoft.Office.Interop.Excel;
using monit95App.Domain.Core;
using monit95App.Domain.Interfaces;
using monit95App.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using АИС_МОР.Domain.Abstract;
using АИС_МОР.Domain.Concrete;
using АИС_МОР.Domain.Concrete.Monit10_1516;
using Excel = Microsoft.Office.Interop.Excel;

namespace АИС_МОР.MyConsole
{
    class Program
    {
        static void Main(string[] args)
        {
            //oneclass2015.Models.MyExcel.KillAllExcellProcess();
            Excel.Application app = new Excel.Application();
            app.DefaultSaveFormat = XlFileFormat.xlOpenXMLWorkbook;
            app.DisplayAlerts = false;
            //АИС_ГИА.Domain.Concrete.cokoEntities context = new АИС_ГИА.Domain.Concrete.cokoEntities();
            //IRatingRepository monit10RatRepos = new Monit101516_ratingRepository(context);
            //ILearnerRepository learnerRepository = new LearnerRepository(context);
            //ITeacherResRepository teacherRes = new TeacherResRepository(context);
            //var ratings = monit10RatRepos.All;

            //Report
            monit95App.Domain.Interfaces.ISchoolRepository schoolRepository = new monit95App.Infrastructure.Data.SchoolRepository(new cokoContext());
            IReportRepository reportRepository = new ReportRepository(new monit95Context());

            var _school = schoolRepository.GetById("0286");
            Console.WriteLine(_school.SchoolName);
            var reports = reportRepository.GetReportListForSchool(_school);          
            //

            ////ЛИСТЫ УЧИТЕЛЕЙ
            ////var teacherResults = teacherRes.All.Where(x => x.SchoolID == "0199");
            //var teacherResults = teacherRes.All;
            //foreach (var teacherResult in teacherResults)
            //{                
            //    Excel.Workbook book =  app.Workbooks.Open(@"D:\YandexDisk\АИС МОР\Мониторинг 10 классов - 2015\Учителя\Индивидуальный лист учителя.xlsx");
            //    TeacherList teacherList = new TeacherList(teacherResult, book);
            //    teacherList.PopulatePattern();
            //    teacherList.SavePattern(2);
            //    book.Close(0);
            //    book = null;
            //}
            ////ЛИСТЫ УЧИТЕЛЕЙ//

            //ИНДИВИДУЛЬНЫЙ ПЛАН ОБУЧАЮЩЕГОСЯ
            //Скопировать шаблон во временную папку
            //string tempFile = System.IO.Path.GetTempPath() + @"\0519.xlsx";
            //File.Copy(@"d:\YandexDisk\АИС МОР\Мониторинг 10 классов - 2015\Шаблоны\Индивидуальный план.xlsx", tempFile, true);

            //var learnes = learnerRepository.All.Where(x => x.SchoolID == "0519").Distinct();
            //string folder = string.Empty;
            //foreach (var learner in learnes)
            //{
            //    Excel.Workbook book = app.Workbooks.Open(tempFile);
            //    LearnerPlan inPlan = new LearnerPlan(learner, book);
            //    inPlan.PopulatePattern();
            //    folder = inPlan.SavePattern(1);

            //    book.Close(0);
            //    book = null;
            //}
            //

                    
            //ReportKP reportKP = new ReportKP(ratings);

            //var schoolIDs = learnes.Select(x => x.SchoolID).Distinct();
            //var schoolsForC = schools.Where(x => schoolIDs.Contains(x.SchoolID));
            //int countSchools = schoolsForC.Count();
            //foreach (var schoolOb in schoolsForC)
            //{
            //    //reportKP.CreateForSchool(schoolOb, 1);
            //    //reportKP.CreateForSchool(schoolOb, 2);                
            //}

            //var school = schools.Single(x => x.SchoolID == "0286");

            //int[] areaIDs = { 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217 };
            //foreach (var areaID in areaIDs)
            //{
            //    var areaLearnes = learnes.Where(x => x.school.AreaID == areaID);
            //    int countAreaLearnes = areaLearnes.Count();
            //    foreach (var learner in areaLearnes)
            //    {
            //        reportKP.CreateIndiv(learner);
            //        Console.WriteLine(areaID + ". Осталось: " + countAreaLearnes--);
            //    }
            //}
            
            //app.Quit();

            //АИС_ГИА.Domain.Concrete.cokoEntities context = new АИС_ГИА.Domain.Concrete.cokoEntities();
            //var records = context.monit10_1516_planoo;
            //foreach (var r in records)
            //{
            //    Console.WriteLine(r.monit10_1516_el.ElName);
            //}

            app.Quit();
            app = null;
        }
    }
}

