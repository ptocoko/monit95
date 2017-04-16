using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Monit95App.Services.Mark.Interfaces
{
    public interface IMarksFileService
    {
        Task SaveAsync(HttpPostedFile httpPostedFile, string userName);
    }
}
