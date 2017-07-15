using Monit95App.Infrastructure.Business.Models;
using Monit95App.Infrastructure.Business.Models.Rsur;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Infrastructure.Business.Interfaces.Rsur
{
    public interface IRsurReportModelCreator
    {
        RsurReportModel Create(int? areaCode, string schoolId = null);
    }
}
