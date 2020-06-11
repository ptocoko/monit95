using System.Collections.Generic;
using Monit95App.Services.Rsur.TestResult;
using ServiceResult;

namespace Monit95App.Services.Rsur.QuestionValue
{
    public interface IQuestionValueService
    {
        QuestionValueEditDto Get(int participCode); // areaCode for Validate
        ServiceResult<QuestionValueEditDto> GetEditDtoByFileId(int fileId, int areaCode);
        VoidResult CreateOrUpdate(QuestionValueEditDto testResultDto);
        ServiceResult<IEnumerable<QuestionValueViewDto>> GetQuestionProtocolList(int areaCode);
        ServiceResult<IEnumerable<QuestionValueViewDto>> GetQuestionProtocolListForSchool(string schoolId);
        VoidResult MarkAsAbsent(int participTestId);
        ServiceResult<int> GetStatistics(int areaCode);
        ServiceResult<int> GetStatisticsForSchool(string schoolId);
    }
}
