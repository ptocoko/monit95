using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace АИС_МОР.Domain.Concrete.Monit10_1516
{
    public class ElementPlan
    {
        public string ElCode { get; set; }
        public bool Checkbool { get; set; } //для представления чек-бокс
        public string ElName { get; set; }
        public string TaskNumOge15 { get; set; } //Номера заданий в КИМ ОГЭ-2015
        public float ValueOge15 { get; set; } //Процент выполнения по КИМ ОГЭ-2015
        public int? CountHours { get; set; } //Количество выделенных часов
        public string Srok { get; set; } //Срок = HoursStart - HoursEnd
        public DateTime? ExamDate { get; set; }
        public string ExamDateString { get; set; } //Дата проведения контрольной без времени
        public DateTime? HoursStart { get; set; }
        public DateTime? HoursEnd { get; set; }       

       public void SetSrok()
        {      
           if(HoursStart !=null && HoursEnd != null)                  
            Srok = HoursStart.GetValueOrDefault().ToShortDateString() + " - " + HoursEnd.GetValueOrDefault().ToShortDateString();
           if (ExamDate != null)
               ExamDateString = ExamDate.Value.Date.ToShortDateString();  
        }
    }
}
