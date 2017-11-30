using Microsoft.Office.Interop.Excel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Excel = Microsoft.Office.Interop.Excel;

namespace Reporter
{
    public class Painter
    {
        private Excel.Series series;
        private Excel.Range range;                

        public Painter(Excel.Series series, Excel.Range range)
        {
            this.series = series;
            this.range = range;
        }

        public void Draw()
        {
            for (int i = 1; i <= range.Rows.Count; i++)
            {
                string str = range.Cells[i, 1].Text; //получить число (пример: 50%)
                str = str.Substring(0, str.Length - 1); //убрать знак процента
                int value = Convert.ToInt32(str);
                if (value < 50)
                {
                    series.Points(i).Interior.Color = (int)XlRgbColor.rgbRed;
                }
                if (value >= 50 && value < 80)
                {
                    series.Points(i).Interior.Color = (int)XlRgbColor.rgbYellow;
                    
                }
                if (value >= 80)
                {
                    series.Points(i).Interior.Color = (int)XlRgbColor.rgbGreen;
                }
            }   
        }
        public void DeleteZero() //Удалить надписи из круговой диаграммы, где значние равно 0
        {
            for (int i = 1; i <= range.Rows.Count; i++)
            {
                string str = range.Cells[i, 1].Text; //получить число (пример: 50,0%)
                str = str.Substring(0, str.Length - 1); //убрать знак процента
                double value = Convert.ToDouble(str);
                if (value == 0.0)
                {
                    series.DataLabels(i).Delete();                    
                }
            }
        }
    }
}
