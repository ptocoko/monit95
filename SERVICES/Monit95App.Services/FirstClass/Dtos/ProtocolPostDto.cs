using Monit95App.Domain.Core.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.FirstClass.Dtos
{
    public class ProtocolPostDto : Person
    {
        public int ParticipTestId { get; set; }

        public IList<QuestionResultDto> QuestionResultsList { get; set; }

        public IList<SubQuestionResultDto> SubQuestionResults { get; set; }
    }

    public class SubQuestionResultDto
    {
        public int MaxMark { get; set; }
        public int? CurrentMark { get; set; }
        public int QuestionId { get; set; }
    }
}
