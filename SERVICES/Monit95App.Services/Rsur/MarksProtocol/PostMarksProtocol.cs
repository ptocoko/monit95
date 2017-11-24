using Monit95App.Domain.Core.Validations;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Monit95App.Services.Rsur.MarksProtocol
{
    public class PostMarksProtocol
    {
        [Required]
        public int ParticipTestId { get; set; }

        [MustHaveOneElement]
        public ICollection<QuestionResult> QuestionResults { get; set; }
    }

    public class QuestionResult
    {
        //[Required]
        public int Order { get; set; }

        //[Required]
        public int CurrentMark { get; set; }
    }
}
