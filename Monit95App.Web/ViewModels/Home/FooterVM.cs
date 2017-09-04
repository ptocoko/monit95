using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Monit95App.ViewModels.Home
{
    public class FooterVM
    {        
        public FooterVM(string userInfo)
        {
            UserInfo = userInfo;
        }

        public string UserInfo { get; set; }
    }
}