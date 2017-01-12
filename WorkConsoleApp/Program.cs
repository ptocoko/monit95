using Monit95App.Services.Work;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Excel = Microsoft.Office.Interop.Excel;

namespace WorkConsoleApp
{
    class Program //Обработка диагностических работ
    {
        static void Main(string[] args)
        {

            System.Diagnostics.Process[] process = System.Diagnostics.Process.GetProcessesByName("Excel");
            foreach (System.Diagnostics.Process p in process)
            {
                if (!string.IsNullOrEmpty(p.ProcessName))
                {
                    try
                    {
                        p.Kill();
                    }
                    catch { }
                }
            }

            Excel.Application excelApp = new Excel.Application();
            excelApp.DisplayAlerts = false;
            string bookName = null;
            //string sheetName = null;
            Excel.Workbook book = null;
            Excel.Worksheet sheet = null;

            bookName = @"d:\Dropbox\ГИА-2016\К&С_ЕГЭ-2016_22.xlsx";
            book = excelApp.Workbooks.Open(bookName);
            sheet = book.Worksheets["ЗАДАНИЯ"];
            Excel.Range target_range = sheet.Range["A3", "E22"];                       
            WorkManager workManager = new WorkManager();
            var ExWList = workManager.CreateExcerciseWorkList(target_range.Rows);
            sheet = book.Worksheets["УМЕНИЯ"];
            target_range = sheet.Range["A3", "C8"];
            var ElWList = workManager.CreateElementWorkList(target_range.Rows, ExWList);

            ElWList.OrderBy(x => x.Code);
            foreach(var element in ElWList)
            {
                Console.Write(element.GetMaxValue() + ",");
            }

            Console.ReadKey();

            book.Close();
            book = null;
            excelApp.Quit();
            excelApp = null;            
        }
    }
}
