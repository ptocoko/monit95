using Monit95App.Domain.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Monit95App.ViewModels.Work201615
{
    public class SelectVM
    {
        private cokoContext context = new cokoContext();

        public string class1icon { get; set; }
        public string class2icon { get; set; }
        public string class3icon { get; set; }

        public SelectVM()
        {
            class1icon = "stop";
            class2icon = "stop";
            class3icon = "stop";
            //class1icon = "remove";
            //class2icon = "remove";
            //class3icon = "remove";            
        }
    }
}