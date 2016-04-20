using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Monit95App.Models
{
    public class SelectVM : ViewModelBase
    {
        public string class1icon { get; set; }
        public string class2icon { get; set; }
        public string class3icon { get; set; }

        public SelectVM()
        {
            class1icon = "remove";
            class2icon = "remove";
            class3icon = "remove";
        }
    }
}