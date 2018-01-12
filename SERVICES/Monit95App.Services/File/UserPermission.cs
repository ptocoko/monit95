using Monit95App.Services.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.File
{
    public class UserPermission
    {
        public string UserName { get; set; }

        public Access Access { get; set; }
    }
}
