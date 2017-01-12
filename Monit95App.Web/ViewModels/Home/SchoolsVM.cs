using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Monit95App.ViewModels.Home
{
    public class SchoolsVM
    {
        public IList<SelectListItem> AreaNames { get; set; }
        public IList<SelectListItem> SchoolNames { get; set; }
    }
}