using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Monit95App.Services.Interfaces
{
    public interface IMarksFileService
    {
        void SaveAsync(HttpPostedFile httpPostedFile, string userName);
    }
}
