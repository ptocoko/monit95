using Monit95App.Services.Rsur;

namespace Monit95App.Services.Interfaces
{
    public interface IRsurReportModelCreator
    {
        RsurReportModel Create(int? areaCode, string schoolId = null);
    }
}
