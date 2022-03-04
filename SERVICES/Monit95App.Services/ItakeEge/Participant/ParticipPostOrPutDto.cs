using Monit95App.Services.Extensions;
using System;
using System.ComponentModel.DataAnnotations;

namespace Monit95App.Services.ItakeEge.Participant
{
    public class ParticipPostOrPutDto
    {
        private string surname;
        [Required]
        [RegularExpression(@"^[А-я-\s]*$")]
        [StringLength(25, MinimumLength = 3)]
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
        [StringLength(25, MinimumLength = 2)]
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

        [StringLength(4)]
        public string ClassId { get; set; }
        
        public string DocumNumber { get; set; }

        public short? ActualCode12 { get; set; }

        public short? ActualCode22 { get; set; }

        public string PrevYearGrade { get; set; }

        public string BookAuthor { get; set; }

        public DateTime? Birthday { get; set; }
    }
}