using Monit95App.Services.ItakeEge.QuestionProtocol;
using Monit95App.Services.QuestionResult.ITakeEgeDtos;
using System.Collections.Generic;

namespace Monit95App.Services.ItakeEge.QuestionResult
{
    public interface IQuestionProtocolService
    {
        IEnumerable<QuestionProtocolReadDto> GetReadDtos(string schoolId);

        QuestionProtocolEditDto GetEditDto(string schoolId, int participTestId);

        void Create(string schoolId, int participTestId, IEnumerable<QuestionMarkPostDto> postDtos);
    }
}
