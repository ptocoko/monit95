using System.IO;
using Monit95App.Services.Rsur;

namespace Monit95App.Services.Interfaces
{
    public interface IRsurReportModelWriter
    {
        Stream Write(RsurReportModel model);
    }
}
