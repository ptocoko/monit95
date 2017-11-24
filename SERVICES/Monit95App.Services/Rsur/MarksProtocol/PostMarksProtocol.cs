using System.Collections.Generic;

namespace Monit95App.Services.Rsur.MarksProtocol
{
    public class PostMarksProtocol
    {
        public int ParticipTestId { get; set; }

        public ICollection<PostQuestionResult> QuestionResults { get; set; }
    }

    public class PostQuestionResult
    {
        public int Order { get; set; }

        public int CurrentMark { get; set; }
    }
}
