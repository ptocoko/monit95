using Monit95App.Services.QuestionResult.ITakeEgeDtos;
using System.Collections.Generic;
using Monit95App.Services.ItakeEge.QuestionProtocol;
using System.Threading.Tasks;

namespace Monit95App.Services.ItakeEge.QuestionResult
{
    public interface IQuestionProtocolService
    {
        Task<IEnumerable<QuestionProtocolReadDto>> GetReadDtos(string schoolId, int projectTestId);

        Task<QuestionProtocolEditDto> GetEditDto(string schoolId, int participTestId);

        Task Create(string schoolId, int participTestId, PostDto postDto);
        
        Task MarkAsWasNot(string schoolId, int participTestId);
    }
}
