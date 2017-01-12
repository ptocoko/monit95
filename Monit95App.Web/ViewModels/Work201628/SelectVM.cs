using Monit95App.Domain.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Monit95App.ViewModels.Work201628
{
	public class SelectVM
	{
        private cokoContext context = new cokoContext();
        public bool subject03; //ФИ
        public bool subject04; //ХИ
        public bool subject06; //БИ
        public bool subject07; //ИС
        public bool subject08; //ГГ
        public bool subject12; //ОБ
        public bool subject18; //ЛИ

        public List<Subject> Subjects;

        public SelectVM()
        {
            Subjects = new List<Subject>
            {
                new Subject { NumCode = 3, StrCode = "ФИ", Name = "Физика", Checked = false },
                new Subject { NumCode = 4, StrCode = "ХИ", Name = "Химия", Checked = false },
                new Subject { NumCode = 5, StrCode = "ИН", Name = "Информатика", Checked = false },
                new Subject { NumCode = 6, StrCode = "БИ", Name = "Биология", Checked = false },
                new Subject { NumCode = 7, StrCode = "ИС", Name = "История", Checked = false },
                new Subject { NumCode = 8, StrCode = "ГГ", Name = "География", Checked = false },
                new Subject { NumCode = 9, StrCode = "АЯ", Name = "Английский язык", Checked = false },
                new Subject { NumCode = 10, StrCode = "НЯ", Name = "Немецкий язык", Checked = false },
                new Subject { NumCode = 11, StrCode = "ФЯ", Name = "Французский язык", Checked = false },
                new Subject { NumCode = 12, StrCode = "ОБ", Name = "Обществознание", Checked = false },
                new Subject { NumCode = 18, StrCode = "ЛИ", Name = "Литература", Checked = false },
            };     
        }
    }
}
