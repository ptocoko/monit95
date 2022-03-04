using System.ComponentModel.DataAnnotations;

namespace Monit95App.Services.DTOs
{    
    public class SchoolDto
    {
        [Display(Name = "Логин на сайте www.monit95.ru:")]
        public string Id { get; set; }

        [Required]
        [Display(Name = "Краткое наименование:")]
        public string SchoolIdWithName { get; set; }

        public int AreaCode { get; set; }

        [Display(Name = "Район:")]
        public string AreaCodeWithName { get; set; }

        [Display(Name = "Тип населенного пункта:")]
        public string TownTypeName { get; set; }
        
        [Required]
        [Display(Name = "Email:")]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
        
        [Required]
        [Display(Name = "Телефон:")]
        public string Phone { get; set; }

        [Display(Name = "Код ГИА:")]
        public int? GiaCode { get; set; }      

        [Display(Name = "Логин на СтатГрад (www.statgrad.org):")]
        public string VprCode { get; set; }

        public bool HasNameCorrection { get; set; }

        public string Name { get; set; }
    }
}