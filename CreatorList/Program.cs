using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Excel = Microsoft.Office.Interop.Excel;

namespace CreatorList
{
    class Program //Создание листов оценки участников
    {
        static void Main(string[] args)
        {
            Excel.Application app = new Excel.Application();
            app.DisplayAlerts = false;
            Excel.Workbook book = app.Workbooks.Open(@"d:\YandexDisk\2016-7 - Гудерм. пед. коледж\К&С_01.xlsx");
            Excel.Worksheet sheet = (Excel.Worksheet)book.Worksheets["ЗАДАНИЯ"];
            Excel.Range range = sheet.get_Range("A3:E15");

            foreach(Excel.Range r in range.Rows)
            {
                Console.WriteLine(r.Cells[1, 1].Value2); //Обозначение задания в работе
                Console.WriteLine(r.Cells[1, 2].Value2); //Коды проверяемых элементов содержания
                Console.WriteLine(r.Cells[1, 3].Value2); //Коды проверяемых умений
                Console.WriteLine(r.Cells[1, 4].Value2); //Уровень сложности задания
                Console.WriteLine(r.Cells[1, 5].Value2); //Максимальный балл за выполнение задания
            }
            Console.ReadKey();
            app.Quit();
            app = null;
        }
    }
}
