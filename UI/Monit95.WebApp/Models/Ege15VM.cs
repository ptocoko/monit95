using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity.SqlServer;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Monit95App.Models
{
    public class Ege15VM
    {

        public string AreaID { get; set; }

        [Display(Name = "Район")]
        public string AreaName { get; set; }

        public string Login { get; set; }
        public string SchoolID { get; set; }

        [Display(Name="Образовательная организация")]
        public string SchoolName { get; set; }

        public IEnumerable<SelectListItem> Areas { get; set; }
        public IEnumerable<SelectListItem> Participants { get; set; }
        public IEnumerable<SelectListItem> Subjects { get; set; }        
        [Required(ErrorMessage = "Выберите участника")]
        [Display(Name = "Фамилия, Имя участника")]
        public string ParticipantID { get; set; }
        public List<SelectListItem> category;
        public IEnumerable<SelectListItem> category2 { get; set; }
        //public ReportProperty ReportPropertyOb { get; set; }

        [Required(ErrorMessage = "Выберите предмет")]
        [Display(Name = "Предмет")]
        public string SubjectCode { get; set; }
        
        [Required(ErrorMessage = "Выберите тип отчета")]
        [Display(Name = "Тип отчета")]
        public string ReportCode { get; set; }

        public Ege15VM()
        {
            //element.Models.cokoEntities dataContext = new element.Models.cokoEntities();
            //int categoryCode = dataContext.or_user.Where(x => x.login == Login).Select(x => x.CategoryCode).First();
            //switch(categoryCode)
            //{
            //    //case 1:
            //    //    Areas = dataContext.schools.Where(x => x.SchoolID == SchoolID).
            //    //       Select(x => new SelectListItem()
            //    //       {
            //    //           Text = x.ege_dat_sub.SubjectName.ToLower(),
            //    //           Value = SqlFunctions.StringConvert((double)x.ege_dat_sub.SubjectCode),
            //    //           Selected = false
            //    //       }).Distinct().OrderBy(x => x.Value);
            //    //    break;
            //    case 2:

            //        break;
            //}
            //Subjects = dataContext.ege_15_res.Where(x => x.SchoolID == SchoolID).
            //           Select(x => new SelectListItem()
            //           {
            //               Text = x.ege_dat_sub.SubjectName.ToLower(),
            //               Value = SqlFunctions.StringConvert((double)x.ege_dat_sub.SubjectCode),
            //               Selected = false
            //           }).Distinct().OrderBy(x => x.Value);

        }
    }
}