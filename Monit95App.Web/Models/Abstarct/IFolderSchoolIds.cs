using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Models.Abstarct
{
    public interface IFolderSchoolIds
    {
        IEnumerable<string> GetFolderSchoolIds(string folder);
    }
}
