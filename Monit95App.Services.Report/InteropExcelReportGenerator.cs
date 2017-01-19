using Monit95App.Services.Report.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Office.Interop.Excel;
using Excel = Microsoft.Office.Interop.Excel;

namespace Monit95App.Services.Report
{
    public class InteropExcelReportGenerator : IExcelReportGenerator, IDisposable
    {
        private Excel.Application excelApp;
        private Excel.Workbook templateBook;
        private Excel.Worksheet dataSheet;
        private Excel.Worksheet exportSheet;

        private void KillAllExcelProcesses()
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
        }
        public InteropExcelReportGenerator(ExportSettings exportSettings)
        {
            KillAllExcelProcesses();
            this.excelApp = new Excel.Application();
            this.excelApp.DisplayAlerts = false;
            this.templateBook = excelApp.Workbooks.Open(exportSettings.TemplateFullFileName);
            this.dataSheet = templateBook.Sheets["data"];
        }
        public void Generated(ParticipReportModel model)
        {
            dataSheet.Range["B5"].Value2 = model.ParticipCode;
            dataSheet.Range["B6"].Value2 = model.Marks;
            dataSheet.Range["B7"].Value2 = model.PrimaryMark;
            dataSheet.Range["B8"].Value2 = model.Mark5;
            dataSheet.Range["B9"].Value2 = model.ParticipSNS;
            dataSheet.Range["B2"].Value2 = Convert.ToDouble(model.Parts);
            string[] columns = new string[] { "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P" };
            int index = 0;
            foreach (var elementValue in model.Elements)
            {
                //TODO: убрать магическое число 3
                dataSheet.Range[columns[index] + "3"].Value2 = Convert.ToDouble(elementValue);
                index++;
            }
            string reportFolder = String.Format(Environment.GetFolderPath(Environment.SpecialFolder.Desktop) + $@"\Учителя{currentSubjectCode}");
            if (!System.IO.Directory.Exists(reportFolder))
                System.IO.Directory.CreateDirectory(reportFolder);            
            exportSheet.ExportAsFixedFormat(Excel.XlFixedFormatType.xlTypePDF, String.Format($@"{reportFolder}\{result.ParticipCode}.pdf"));
            Console.WriteLine(count++);
        }

        public void Dispose()
        {
            templateBook.Close();
            excelApp.Quit();
        }
    }
}
