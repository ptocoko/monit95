using Monit95App.Domain.Core;

namespace Monit95App.Services.DTOs
{
    public class RsurParticipGetDto
    {
        public SchoolParticip SchoolParticipInfo { get; set; }

        public int Code { get; set; }

        //public string Surname { get; set; }
        
        //public string Name { get; set; }

        //public string SecondName { get; set; }

        //public string SchoolIdWithName { get; set; } // 0001 - School №1

        public string AreaCodeWithName { get; set; }

        public string RsurSubjectName { get; set; }

        public string CategoryName { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }

        public string Birthday { get; set; }

        public string ClassNumbers { get; set; }

        public int ActualCode { get; set; }

        public string LastBlockName { get; set; }

        public int? LastBlockStatus { get; set; }
    }
}