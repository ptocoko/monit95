using Monit95App.Services.Work.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Monit95App.Services.Work.Concrete;

using Excel = Microsoft.Office.Interop.Excel;
using Ionic.Zip;
using System.IO;
using System.Reflection;
using Monit95App.Domain.Core;

namespace Monit95App.Services.Work.Concrete
{
    //201636 - 
    public class ReportModelManager_201636 : ICreateReportFromDB<readyoneclass_res, LRmodel_201636>, 
                                             IExportReportToXLSX<LRmodel_201636>, 
                                             IDisposable
    {       
        private Dictionary<string, string> ClassCodes;
        private Excel.Application app;
        private Excel._Workbook book;
        private Excel._Worksheet sheet;

        private string DefineTestResult5Name(short? TestResult5)
        {
            if (TestResult5 == 2) return "1 группа – группа экстра-риска";
            if (TestResult5 == 3) return "2 группа – группа риска";
            if (TestResult5 == 4) return "3 группа – стабильная середина";
            if (TestResult5 == 5) return "4 группа – высокая возрастная норма";

            return string.Empty;
        }

        public ReportModelManager_201636()
        {
            app = new Excel.Application();
            app.DisplayAlerts = false;
            book = app.Workbooks.Open(@"D:\Dropbox\[2016-30] - Исслед. подг. обуч. 1 кл. 2016-2017\Шаблон. Отчет по школе.xlsx");       
            ClassCodes = new Dictionary<string, string>()
            {
                { "0100", "1" },
                { "0101", "1 А" },
                { "0102", "1 Б" },
                { "0103", "1 В" },
                { "0104", "1 Г" },
                { "0105", "1 Д" },
                { "0106", "1 Е" },
                { "0107", "1 Ж" },
                { "0108", "1 З" },
                { "0109", "1 И" },
                { "0110", "1 К" },
                { "0111", "1 Л" }
            };
        }

        public SRmodel<LRmodel_201636> GreateSchoolReport(List<readyoneclass_res> learnerResults)
        {
            var school = learnerResults.FirstOrDefault();
            SRmodel<LRmodel_201636> report = new SRmodel_201636
            {
                SchoolName = $"{school.SchoolID} - {school.School.Name}",
                AreaName = $"{school.School.AreaId} - {school.School.area.AreaName}"
            };

            List<LRmodel_201636> learnerReports = new List<LRmodel_201636>();
            learnerResults.ForEach(x =>
            learnerReports.Add(new LRmodel_201636
            {
                LearnerInfo = new Learner {Surname = x.SNS },
                ClassName = ClassCodes[x.ClassCode],
                PrimaryMark = x.PrimaryMark,
                OldGroupName = x.OldGroupCode == 67 ? "6-7 лет" : "7-8 лет",
                WasOrWasntDOO_str = x.WasOrWasntDOO == 1 ? "ДА" : "НЕТ",
                WasOrWasnt_str = x.WasOrWasnt == 1 ? "ДА" : "НЕТ",
                TestResult5Name = DefineTestResult5Name(x.TestResult5),
                ValueArray = x.WasOrWasnt == 1 ? $"{x.t1};{x.t2};{x.t3};{x.t4};{x.t5}" : ""
            }
            ));

            report.LearnerReports = learnerReports;
            return report;
        }

        public void ExportSchoolReport(SRmodel<LRmodel_201636> report)
        {

            //сделаем копию
            sheet = book.Sheets["ОТЧЕТ"]; //лист "ОТЧЕТ" - это у нас шаблон                 
            sheet.Copy(Missing.Value, book.Sheets[book.Sheets.Count]);
            book.Sheets[book.Sheets.Count].Name = "ОТЧЕТ ОО";            
            
            book.Sheets["ОТЧЕТ"].Visible = Excel.XlSheetVisibility.xlSheetHidden; //скроем шаблон            
            sheet = book.Sheets["ОТЧЕТ ОО"];

            for (;;)
            {
                var cell = sheet.UsedRange.Find("{*}", Type.Missing, Excel.XlFindLookIn.xlValues,
                    Excel.XlLookAt.xlWhole, Excel.XlSearchOrder.xlByRows, Excel.XlSearchDirection.xlNext);

                if (cell == null) break;

                var value = cell.Value2 as string;
                switch (value)
                {
                    case "{SchoolName}": cell.Value2 = report.SchoolName; break;
                    case "{AreaName}": cell.Value2 = report.AreaName; break;                    

                    default: break; // log issue
                }
            }

            int rowNumber = 7;
            foreach(var learnerReport in report.LearnerReports.OrderBy(x=>x.ClassName).ThenBy(x => x.LearnerInfo))
            {
                sheet.Range["B" + rowNumber].Value2 = learnerReport.LearnerInfo.Surname;
                sheet.Range["C" + rowNumber].Value2 = learnerReport.ClassName;
                sheet.Range["D" + rowNumber].Value2 = learnerReport.OldGroupName;
                sheet.Range["E" + rowNumber].Value2 = learnerReport.WasOrWasntDOO_str;
                sheet.Range["F" + rowNumber].Value2 = learnerReport.WasOrWasnt_str;
                sheet.Range["G" + rowNumber].Value2 = learnerReport.TestResult5Name;
                sheet.Range["H" + rowNumber].Value2 = learnerReport.PrimaryMark;
                sheet.Range["I" + rowNumber].Value2 = learnerReport.ValueArray;
                rowNumber++;
            }

            //Сохраняем
            //1. Создаем папку на рабочем столе
            string reportFolder = $@"{Environment.GetFolderPath(Environment.SpecialFolder.Desktop)}\Готовность 1 кл\{report.SchoolName.Substring(0,4)}";
            if (!System.IO.Directory.Exists(reportFolder))
                System.IO.Directory.CreateDirectory(reportFolder);
            //2. Сохраняем в папку на рабочем столе
            string file_xlsx = $@"{reportFolder}\{report.SchoolName.Substring(0, 4)}_201636.xlsx";
            string file_zip = $@"{reportFolder}\{report.SchoolName.Substring(0, 4)}_201636.zip";
            sheet.SaveAs(file_xlsx);

            //3. Архивируем
            using (ZipFile zip = new ZipFile())
            {                
                zip.UseUnicodeAsNecessary = true; //русские символы включаем
                zip.AddFile(file_xlsx, "");
                zip.Save(file_zip); //сохранить архив в полный путь
            }

            book.Sheets["ОТЧЕТ"].Visible = Excel.XlSheetVisibility.xlSheetVisible; //Хотя бы один лист должен быть виден
            book.Sheets["ОТЧЕТ ОО"].Delete();
        }

        public void Dispose()
        {
            app.Quit();
            app = null;
            book.Close(0);
            book = null;
        }
    }
}
