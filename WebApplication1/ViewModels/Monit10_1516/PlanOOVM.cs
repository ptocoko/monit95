using Monit95App.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Monit95App.ViewModels.Monit10_1516
{
    public class PlanOOVM : ViewModelBase
    {
        // Свойства
        [Display(Name = "Элемент содержания:")]
        public string ElName { get; set; }

        public string ElCode { get; set; }
        public string SchoolID { get; set; }

        [Display(Name = "Количество выделенных часов:")]
        public int? CountHours { get; set; }

        [Display(Name = "Дата начала работы:")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime? HoursDateStart { get; set; }

        [Display(Name = "Дата окончания работы:")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime? HoursDateEnd { get; set; }

        [Display(Name = "Дата контрольной работы:")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime? ExamDate { get; set; }
    }
}