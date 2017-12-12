using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Monit95App.Models
{
    public class WishModel
    {
        public int Id { get; set; }

        [Display(Name = "ID Пользователя")]
        public string UserId { get; set; }
        public string UserName { get; set; }

        [Required]
        [Display(Name = "Пожелание")]
        public string Message { get; set; }

        [Display(Name = "Дата")]
        public DateTime Date { get; set; }
    }
}