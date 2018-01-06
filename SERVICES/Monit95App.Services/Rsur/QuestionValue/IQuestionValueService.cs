using System.Collections.Generic;
using Monit95App.Services.Rsur.TestResult;
using ServiceResult;

namespace Monit95App.Services.Rsur.QuestionValue
{
    public interface IQuestionValueService
    {
        QuestionValueEditDto Get(int participCode, int areaCode); // areaCode for Validate
        ServiceResult<QuestionValueEditDto> GetEditDtoByFileId(int fileId, int areaCode);
        VoidResult CreateOrUpdate(QuestionValueEditDto testResultDto, int areaCode);
        ServiceResult<IEnumerable<QuestionValueViewDto>> GetQuestionProtocolList(int areaCode);
        VoidResult MarkAsAbsent(int participTestId, int areaCode);
        ServiceResult<int> GetStatistics(int areaCode);
    }
}
