using System.IO;
using System.Threading.Tasks;

namespace Monit95App.Services.Interfaces
{
    public interface IRsurReportModelConverter : IRsurReportModelCreator, IRsurReportModelWriter
    {
        Task<Stream> GetStream(int? areaCode = null, string schoolId = null);
    }
}
