using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using АИС_МОР.NineClass.Abstract;
using АИС_МОР.NineClass.Concrete;
using АИС_МОР.NineClass.Entities;
using Excel = Microsoft.Office.Interop.Excel;
namespace АИС_МОР.NineClass
{
    class Program
    {
        static void Main(string[] args)
        {
            //собрать список  файлов *.docx
            string pathWordFiles = @"D:\YandexDisk\ФИ, 9 класс (2016-3)\от Бекхана temp";
            string[] wordFiles = Directory.GetFiles(pathWordFiles, "*.docx");
            //
            CreatorSchoolResult creator = new CreatorSchoolResult();
            List<SchoolResult> schoolResults = new List<SchoolResult>();
            foreach(var file in wordFiles)
            {
                var ob = creator.CreateSchoolResultFromWordTable(file);
                ob.DeleteChar();
                schoolResults.Add(ob);
            }

            //загружаем в excel-шаблоны
            Excel.Application excelApp = new Excel.Application();
            excelApp.DisplayAlerts = false;
            Excel.Workbook book = excelApp.Workbooks.Open(@"D:\YandexDisk\ФИ, 9 класс (2016-3)\Вывод КАС ДОУ\0000, ТА.xlsx");
            Excel.Worksheet sheet = (Excel.Worksheet)book.Worksheets[1];
            foreach(var schoolResult in schoolResults)
            {                                
                sheet.get_Range("A2").Value2 = schoolResult.SchoolID;
                sheet.get_Range("B2").Value2 = schoolResult.B;
                sheet.get_Range("C2").Value2 = schoolResult.C;
                sheet.get_Range("D2").Value2 = schoolResult.D;
                sheet.get_Range("E2").Value2 = schoolResult.E;
                sheet.get_Range("F2").Value2 = schoolResult.F;
                sheet.get_Range("G2").Value2 = schoolResult.G;
                sheet.get_Range("H2").Value2 = schoolResult.H;
                sheet.get_Range("I2").Value2 = schoolResult.I;
                sheet.get_Range("J2").Value2 = schoolResult.J;
                sheet.get_Range("K2").Value2 = schoolResult.CountPart;
                book.SaveAs(pathWordFiles + @"\" + schoolResult.SchoolID + @", ТА.xlsx");
            }
            book.Close(0);
            book = null;
            excelApp.Quit();
            excelApp = null;
            //
            //готовим шаблон
            //string template = @"\\192.168.88.220\Install\ФИ, 9 класс (2016-3)\0000, ТА.xlsx"; //ВВОД
            //string schoolFile = Path.GetTempPath() + @"\" + Path.GetFileName(template);            
            //File.Copy(template, schoolFile, true);
        }
    }
}
