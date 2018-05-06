using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.OneTwoThree.QuestionProtocol
{
    public interface IQuestionProtocolService
    {
        IEnumerable<QuestionListDto> GetQuestionListDtos(string schoolId);
        QuestionProtocolDto GetProtocol(int participTestId);
        void EditQuestionMarks(int participTestId, IEnumerable<QuestionMarkDto> questionMarks);
        void MarkAsAbsent(int participTestId);
    }
}
