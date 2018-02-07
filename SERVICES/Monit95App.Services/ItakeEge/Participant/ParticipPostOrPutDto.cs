using Monit95App.Services.Extensions;
using System.ComponentModel.DataAnnotations;

namespace Monit95App.Services.ItakeEge.Participant
{
    public class ParticipPostOrPutDto
    {
        private string surname;
        [Required]
        [RegularExpression(@"^[А-я-\s]*$")]
        [StringLength(25, MinimumLength = 4)]
        public string Surname {
            get
            {
                return surname;
            }
            set
            {
                surname = value.NormalizeName();
            }
        }

        private string name;
        [Required]
        [RegularExpression(@"^[А-я-\s]*$")]
        [StringLength(25, MinimumLength = 3)]
        public string Name {
            get
            {
                return name;
            }
            set
            {
                name = value.NormalizeName();
            }
        }

        private string secondName;
        [RegularExpression(@"^[А-я-\s]*$")]
        public string SecondName
        {
            get
            {
                return secondName;
            }
            set
            {
                secondName = value.NormalizeName();
            }
        }

        [Required]
        [Range(1, 999999999)]
        public int DocumNumber { get; set; }        
    }
}