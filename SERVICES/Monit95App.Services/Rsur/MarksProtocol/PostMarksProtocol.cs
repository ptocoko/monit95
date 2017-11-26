using System.Collections.Generic;

namespace Monit95App.Services.Rsur.MarksProtocol
{
    using System.ComponentModel.DataAnnotations;
    using System.Diagnostics.CodeAnalysis;

    public class PostMarksProtocol
    {                 
        public int ParticipTestId { get; set; }
        
        [Required]
        public ICollection<PostQuestionResult> QuestionResults { get; set; }
    }

    [SuppressMessage("StyleCop.CSharp.MaintainabilityRules", "SA1402:FileMayOnlyContainASingleClass", Justification = "Reviewed. Suppression is OK here.")]
    public class PostQuestionResult
    {
        public int Order { get; set; }

        public int CurrentMark { get; set; }
    }
}
