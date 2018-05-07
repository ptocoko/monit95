using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.OneTwoThree.QuestionProtocol
{
    public interface IQuestionProtocolService
    {
        IEnumerable<QuestionListDto> GetQuestionListDtos(string schoolId, string numberCode);
        QuestionProtocolDto GetProtocol(int participTestId, string schoolId);
        void EditQuestionMarks(int participTestId, string schoolId, IEnumerable<QuestionMarkDto> questionMarks);
        void MarkAsAbsent(int participTestId, string schoolId);
    }
}
