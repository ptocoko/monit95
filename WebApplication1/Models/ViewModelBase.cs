using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Monit95App.Models
{
	public class ViewModelBase
	{
        //Мониторинг 10 классов
        public string SchoolID { get; set; }
        public string[] monit10 = { "0336", "0019", "0020", "0050", "0054", "0199", "0257", "0260", "0324", "0326", "0330", "0466", "0519" };
	}
}