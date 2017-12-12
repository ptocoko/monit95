using System.Collections.Generic;
using Monit95App.Services.Validation;

namespace Monit95App.Services.Rsur.TestResult
{
    public interface ITestResultService
    {
        // TODO: delete
        // RsurTestStatisticsDto GetStatistics(int rsurTestId, int? areaCode = null);        
        IDictionary<int, RsurTestStatisticsDto> GetStatistics(int areaCode);

        string GetTestName(int rsurTestId);                

        TestResulteEditDto Get(int participCode, int areaCode); // areaCode for Validate

        VoidResult CreateOrUpdate(TestResulteEditDto testResultDto, int areaCode);
        ServiceResult<IEnumerable<TestResultViewDto>> GetAll(int areaCode);
    }
}
