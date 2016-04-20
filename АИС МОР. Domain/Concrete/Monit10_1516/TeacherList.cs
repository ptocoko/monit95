using Microsoft.Office.Interop.Excel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using АИС_ГИА.Domain.Concrete;
using АИС_МОР.Domain.Abstract;
using Excel = Microsoft.Office.Interop.Excel;
using System.Drawing;
using Reporter;

namespace АИС_МОР.Domain.Concrete.Monit10_1516
{
    public class TeacherList
    {
        //свойства
        public string SurnameNameSN { get; set; }
        public string SchoolName { get; set; }
        public string TeacherStaj { get; set; }
        public string TeacherCatName { get; set; }

        //хранилища
        private ITeacherResRepository teacherResRepository = new TeacherResRepository(new АИС_ГИА.Domain.Concrete.cokoEntities());
        private monit10_1516_tres teacherRes;

        //private
        private Excel.Workbook book;
        Excel.Worksheet sheet;
        public TeacherList(monit10_1516_tres teacherRes, Excel.Workbook book)
        {
            this.book = book;
            this.teacherRes = teacherRes;
        }

        public void PopulatePattern()
        {
            ChartObject chartObject = null;
            Excel.Series ser = null;
            Excel.Range range = null;
            switch(teacherRes.SubjectCode)
            {
                case 1:
                    sheet = (Excel.Worksheet)book.Worksheets["01"]; //русский язык
                    //реквизиты
                    SurnameNameSN = teacherRes.surname + " " + teacherRes.name + " " + teacherRes.SecondName;
                    sheet.get_Range("C3").Value2 = teacherRes.surname.ToUpper() + " " + teacherRes.name.ToUpper() + " " + teacherRes.SecondName.ToUpper();
                    sheet.get_Range("C4").Value2 = teacherRes.school.SchoolName.ToUpper();
                    sheet.get_Range("C5").Value2 = teacherRes.number;
                    sheet.get_Range("E5").Value2 = teacherRes.TeacherStaj;
                    sheet.get_Range("E6").Value2 = teacherRes.or_teachcat.TeacherCatName;

                    //элементы содержания
                    sheet.get_Range("F10").Value2 = (teacherRes.t3 + teacherRes.t22) / 2;
                    sheet.get_Range("F11").Value2 = (teacherRes.t8 + teacherRes.t9 + teacherRes.t10 + teacherRes.t11 + teacherRes.t12 + teacherRes.t13 + teacherRes.t14) / 7;
                    sheet.get_Range("F12").Value2 = (teacherRes.t15 + teacherRes.t16 + teacherRes.t17 + teacherRes.t18 + teacherRes.t19) / 6;
                    sheet.get_Range("F13").Value2 = (teacherRes.t2 + teacherRes.t20 + teacherRes.t21 + teacherRes.t23 + teacherRes.t25) / 27;
                    sheet.get_Range("F14").Value2 = (teacherRes.t4 + teacherRes.t5 + teacherRes.t6 + teacherRes.t7) / 8;
                    sheet.get_Range("F15").Value2 = teacherRes.t24 / 4;
                    sheet.get_Range("F16").Value2 = (teacherRes.t1 + teacherRes.t25) / 25;
                    
                    //изменить цвет
                    chartObject = sheet.ChartObjects(@"Диаграмма1");
                    ser = (Excel.Series)chartObject.Chart.SeriesCollection(1);
                    range = sheet.get_Range("F10", "F16");
                    Painter painter01 = new Painter(ser, range);
                    painter01.Draw();                                                                                                            

                    break;
                case 2:
                    sheet = (Excel.Worksheet)book.Worksheets["02"]; //математика
                    //реквизиты
                    SurnameNameSN = teacherRes.surname + " " + teacherRes.name + " " + teacherRes.SecondName;
                    sheet.get_Range("C3").Value2 = teacherRes.surname.ToUpper() + " " + teacherRes.name.ToUpper() + " " + teacherRes.SecondName.ToUpper();
                    sheet.get_Range("C4").Value2 = teacherRes.school.SchoolName.ToUpper();
                    sheet.get_Range("C5").Value2 = teacherRes.number;
                    sheet.get_Range("E5").Value2 = teacherRes.TeacherStaj;
                    sheet.get_Range("E6").Value2 = teacherRes.or_teachcat.TeacherCatName;

                    //элементы содержания
                    sheet.get_Range("F10").Value2 = (teacherRes.t1 + teacherRes.t2 + teacherRes.t3 + teacherRes.t14 + teacherRes.t16) / 5;
                    sheet.get_Range("F11").Value2 = (teacherRes.t3 + teacherRes.t7 + teacherRes.t20 + teacherRes.t21 + teacherRes.t22 + teacherRes.t23) / 12;
                    sheet.get_Range("F12").Value2 = (teacherRes.t4 + teacherRes.t8 + teacherRes.t16 + teacherRes.t21 + teacherRes.t22 + teacherRes.t23) / 12;
                    sheet.get_Range("F13").Value2 = (teacherRes.t6 + teacherRes.t22 + teacherRes.t23) / 8;
                    sheet.get_Range("F14").Value2 = (teacherRes.t5 + teacherRes.t15 + teacherRes.t21 + teacherRes.t22 + teacherRes.t23) / 11;
                    sheet.get_Range("F15").Value2 = (teacherRes.t2 + teacherRes.t8 + teacherRes.t22 + teacherRes.t23) / 9;
                    sheet.get_Range("F16").Value2 = (teacherRes.t9 + teacherRes.t10 + teacherRes.t11 + teacherRes.t12 + teacherRes.t13 + teacherRes.t17 + teacherRes.t24 + teacherRes.t25 + teacherRes.t26) / 15;
                    sheet.get_Range("F17").Value2 = (teacherRes.t18 + teacherRes.t19) / 2;

                    //изменить цвет
                    chartObject = sheet.ChartObjects(@"Диаграмма1");
                    ser = (Excel.Series)chartObject.Chart.SeriesCollection(1);
                    range = sheet.get_Range("F10", "F17");
                    Painter painter02 = new Painter(ser, range);
                    painter02.Draw();                      
                    break;

                default:
                    break;
            }
        }

        public string SavePattern(int code = 2) //1 - xlsx, 2 - pdf
        {
            string reportFolder = String.Format(Environment.GetFolderPath(Environment.SpecialFolder.Desktop) + @"\Листы учителей\{0} - {1}\{2}\Листы учителей", teacherRes.school.AreaID,
                                                                                                                    teacherRes.school.area.AreaName.TrimEnd(), teacherRes.SchoolID);
            if (!System.IO.Directory.Exists(reportFolder))
            {
                System.IO.Directory.CreateDirectory(reportFolder);
            }

            switch (code)
            {
                case 1:
                    sheet.SaveAs(String.Format(@"{0}\{1}.xlsx", reportFolder, SurnameNameSN));
                    break;

                case 2:
                    sheet.ExportAsFixedFormat(XlFixedFormatType.xlTypePDF, String.Format(@"{0}\{1}.pdf", reportFolder, SurnameNameSN));                    
                    break;

                default:
                    break;
            }
            return reportFolder;
        }       
    }
}
