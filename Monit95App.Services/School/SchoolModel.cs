using System.ComponentModel.DataAnnotations;

namespace Monit95App.Services.School
{
    public class SchoolModel
    {
        [Display(Name = "Логин на сайте www.monit95.ru:")]
        public string Id { get; set; }

        [Display(Name = "Краткое наименование:")]
        public string Name { get; set; }       

        [Display(Name = "Район:")]
        public string AreaName { get; set; }

        [Display(Name = "Тип населенного пункта:")]
        public string TownTypeName { get; set; }
        
        [Display(Name = "Email:")]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [Display(Name = "Телефон:")]
        public string Phone { get; set; }

        [Display(Name = "Код ГИА:")]
        public int? GiaCode { get; set; }      

        [Display(Name = "Логин на СтатГрад (www.statgrad.org):")]
        public string VprCode { get; set; }

        public bool HasNameCorrection { get; set; }
    }
}