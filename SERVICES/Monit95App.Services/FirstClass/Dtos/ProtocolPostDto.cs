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

        public IList<QuestionResultDto> QuestionResultsCollection { get; set; }
    }
}
