using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace АИС_МОР.Domain.Concrete.Monit10_1516
{
    public class Learner
    {
        //свойства
        public int LearnerID { get; set; }
        public string ElCode { get; set; }
       
        [Display(Name = "Фамилия:")]
        [Required(ErrorMessage = "Укажите фамилию")]
        public string Surname { get; set; }

        [Display(Name = "Имя:")]
        [Required(ErrorMessage = "Имя")]
        public string Name { get; set; }

        [Display(Name = "Отчество:")]
        [Required(ErrorMessage = "Укажите отчество")]
        public string SecondName { get; set; }

        public string ClassName { get; set; }
        public double ValueOge15 { get; set; }
        public int RatingID { get; set; }
        public int? RatingValue { get; set; }

    }
}