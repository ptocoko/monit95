using System.Collections.Generic;
using System.Threading.Tasks;
using Monit95App.Services.Rsur.TestResult;
using ServiceResult;

namespace Monit95App.Services.Rsur.QuestionValue
{
    public interface IQuestionValueService
    {
        QuestionValueEditDto Get(int participCode); // areaCode for Validate
        ServiceResult<QuestionValueEditDto> GetEditDtoByFileId(int fileId, int areaCode);
        Task<VoidResult> CreateOrUpdate(QuestionValueEditDto questionValueEditDto);
        ServiceResult<IEnumerable<QuestionValueViewDto>> GetQuestionProtocolList(int areaCode);
        ServiceResult<IEnumerable<QuestionValueViewDto>> GetQuestionProtocolListForSchool(string schoolId);
        Task<VoidResult> MarkAsAbsent(int participTestId);
        ServiceResult<int> GetStatistics(int areaCode);
        ServiceResult<int> GetStatisticsForSchool(string schoolId);
    }
}
