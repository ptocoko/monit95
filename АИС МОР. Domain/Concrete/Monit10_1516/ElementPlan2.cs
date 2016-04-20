using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace АИС_МОР.Domain.Concrete.Monit10_1516
{
   public class ElementPlan2
    {
       //свойства
       public string ElName { get; set; }
       public string TaskNumOge15 { get; set; } //Номера заданий в КИМ ОГЭ-2015
       public float ValueOge15 { get; set; } //% выполнения по КИМ ОГЭ-2015
       public int? CountHours { get; set; } //Количество выделенных часов
       public string Srok { get; set; } //Срок = HoursStart - HoursEnd
       public int? RatingValue { get; set; }  
                                  

       public void SetSrok()
        {      
           //if(HoursStart != null && HoursEnd != null)                  
           // Srok = HoursStart.GetValueOrDefault().ToShortDateString() + " - " + HoursEnd.GetValueOrDefault().ToShortDateString();
        }
    }
}
