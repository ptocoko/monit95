using Microsoft.Office.Interop.Excel;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Excel = Microsoft.Office.Interop.Excel;

//ege_15_pattern_el.xlsx
//ege_15_pattern_um.xlsx
namespace element.Models
{
    public class CodifierReporter
    {
        Excel.Worksheet _sheet;
        public CodifierReporter(Excel.Worksheet _sheet)
        {
            this._sheet = _sheet;
        }
        public void FillSheet(ReportProperty _reportProperty, DbContext _dbContext, string _dbName)
        {
            Excel.Range range = _sheet.get_Range("B8", "C130");
            int rowNumber = 1;
            
            string sql = string.Empty;
            string tasks = string.Empty; //            
            int maxMark;
            int rowNumber2 = 8;
            while (range.Cells[rowNumber, 1].Text != "")
            {
                tasks = range.Cells[rowNumber, 1].Text;
                maxMark = Convert.ToInt32(range.Cells[rowNumber++, 2].Text);

                tasks = Regex.Replace(tasks, @"(\d+)", "t$1");
                tasks = tasks.Replace("; ", "+");
                switch (_reportProperty.reportCode)
                {
                    case 1:
                        sql = String.Format(@"SELECT SUM({0}) / (COUNT(*) * {1}) FROM {2} r
                                             JOIN school s ON s.SchoolID = r.SchoolID
                                             WHERE s.SchoolViewCode != 1003 AND SubjectCode = {3}", tasks, maxMark, _dbName, _reportProperty.SubjectCode);
                        break;
                    case 2:
                        sql = String.Format(@"SELECT SUM({0}) / (COUNT(*) * {1}) FROM {2} r 
                                            JOIN school s ON s.SchoolID = r.SchoolID
                                            WHERE SubjectCode = {3} AND s.AreaID = {4}", tasks, maxMark, _dbName, _reportProperty.SubjectCode, _reportProperty.AreaID);
                        break;
                    case 3:
                        sql = String.Format(@"SELECT SUM({0}) / (COUNT(*) * {1}) FROM {2} WHERE SubjectCode = {3} 
                                             AND SchoolCode = {4}", tasks, maxMark, _dbName, _reportProperty.SubjectCode, _reportProperty.SchoolCode);
                        break;
                    case 5:
                        sql = String.Format(@"SELECT SUM({0}) / (COUNT(*) * {1}) FROM {2} WHERE SubjectCode = {3} 
                                             AND ParticipantID = {4}", tasks, maxMark, _dbName, _reportProperty.SubjectCode, _reportProperty.ParticipantID);
                        break;
                }
                
                _sheet.get_Range("E" + rowNumber2++).Value2 = _dbContext.Database.SqlQuery<double>(sql).Single();
            }
            ((Excel.Range)_sheet.Cells[1, 3]).EntireColumn.Delete(null); //Удалить столбец «Макс. балл»
        }

        public void SavePattern(int code = 1) //1 - xlsx, 2 - pdf
        {
            string reportFolder = String.Format(Environment.GetFolderPath(Environment.SpecialFolder.Desktop) + @"\Отчеты по ЕГЭ-2015");
            if (!System.IO.Directory.Exists(reportFolder))
            {
                System.IO.Directory.CreateDirectory(reportFolder);
            }

            switch (code)
            {
                case 1:
                    _sheet.SaveAs(String.Format(@"{0}\Отчет по предмету.xlsx", reportFolder));
                    break;

                case 2:
                    _sheet.ExportAsFixedFormat(XlFixedFormatType.xlTypePDF, String.Format(@"{0}\Отчет по предмету.pdf", reportFolder));
                    break;

                default:
                    break;
            }
        }
    }
}
