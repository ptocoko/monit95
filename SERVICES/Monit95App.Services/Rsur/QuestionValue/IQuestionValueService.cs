using System.Collections.Generic;
using Monit95App.Services.Rsur.TestResult;
using Monit95App.Services.Validation;

namespace Monit95App.Services.Rsur.QuestionValue
{
    public interface IQuestionValueService
    {
        // TODO: delete
        // RsurTestStatisticsDto GetStatistics(int rsurTestId, int? areaCode = null);        
        IDictionary<int, RsurTestStatisticsDto> GetStatistics(int areaCode);

        string GetTestName(int rsurTestId);                

        QuestionValueEditDto Get(int participCode, int areaCode); // areaCode for Validate
        ServiceResult<QuestionValueViewDto> GetEditDtoByFileId(int fileId, int areaCode);

        VoidResult CreateOrUpdate(QuestionValueEditDto testResultDto, int areaCode);
        //ServiceResult<IEnumerable<TestResultViewDto>> GetAll(int areaCode);
        ServiceResult<IEnumerable<QuestionValueViewDto>> GetQuestionProtocolList(int areaCode);

        VoidResult MarkAsAbsent(int participTestId, int areaCode);
    }
}
