using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Monit95App.Services.Rsur.MarksProtocol
{
    using Monit95App.Domain.Core.DataAnnotations;

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
