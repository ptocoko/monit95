using Monit95App.Services.QuestionResult.ITakeEgeDtos;
using System.Collections.Generic;

namespace Monit95App.Services.ItakeEge.QuestionResult
{
    public interface IQuestionProtocolService
    {
        IEnumerable<QuestionProtocolReadDto> GetReadDtos(string schoolId);

        QuestionProtocolEditDto GetEditDto(string schoolId, int participTestId);

        void Create(string schoolId, int participTestId, Dictionary<int, double> orderMarkDict);
        
        void MarkAsWasNot(string schoolId, int participTestId);
    }
}
