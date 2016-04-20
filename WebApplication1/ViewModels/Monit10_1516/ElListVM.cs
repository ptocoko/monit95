using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using Monit95App.Models;

namespace Monit95App.ViewModels.Monit10_1516
{
    public class ElListVM : ViewModelBase
    {
        // Свойства
        [Display(Name = "Район:")]
        public string AreaName { get; set; }
        
        [Display(Name = "Образовательная организация:")]
        public string SchoolName { get; set; }

        [Display(Name = "Предмет:")]
        public string SubjectName { get; set; }

        [Display(Name = "Элемент содержания:")]
        public string ElName { get; set; }

        [Display(Name = "Номера заданий по КИМ ОГЭ-2015:")]
        public string TaskNumOge15 { get; set; }        

        [Display(Name = "Количество выделенных часов:")]
        public int? CountHours { get; set; }

        [Display(Name = "Срок проведения коррекционной работы:")]
        public string TimeForExam { get; set; }

        [Display(Name = "Дата контрольной работы:")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public string ExamDateString { get; set; }
        
        public DateTime? ExamDate { get; set; }

        public string ElCode { get; set; }
        public string SchoolID { get; set; }

        public List<Monit10Learner> Monit10Learnes { get; set; }
        public DateTime? HoursDateStart { get; set; }
        public DateTime? HoursDateEnd { get; set; }

        public void DifineSubjectName()
        {
            if (ElCode.StartsWith("01"))
            {
                SubjectName = "РУССКИЙ ЯЗЫК";
            }
            else
            {
                SubjectName = "МАТЕМАТИКА";
            }            
        }                
        public void PopulateTimeForExam()
        {
            if (HoursDateStart != null && HoursDateEnd != null)
            {
                TimeForExam = HoursDateStart.Value.Date.ToShortDateString() + " - " + HoursDateEnd.Value.Date.ToShortDateString();
                ExamDateString = ExamDate.Value.Date.ToShortDateString();
            }

            if (ExamDate != null)
            {
                ExamDateString = ExamDate.Value.Date.ToShortDateString();
            }            
        }
        
    }
}