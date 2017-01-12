using Monit95App.Services.Work.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Excel = Microsoft.Office.Interop.Excel;

namespace Monit95App.Services.Work.Concrete
{
    //201636 - Готовность 1-х классов. Отчет для школ
    public class LRmodel_201636 : LRmodel //Лист оценки обучающегося
    {
        //данные обучающегося        
        public string OldGroupName { get; set; } //Возрастная группа: 6-7 лет/7-8 лет        
        public string WasOrWasntDOO_str { get; set; } //ДА/НЕТ
        public string WasOrWasnt_str { get; set; }    //ДА/НЕТ        
        
    }
}
