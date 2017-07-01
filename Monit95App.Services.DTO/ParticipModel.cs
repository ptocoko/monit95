using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Monit95App.Domain.DTO
{
    public class ParticipModel
    {
        public int Id { get; set; }
        public int ProjectCode { get; set; }
        public string ParticipCode { get; set; }
        public string Surname { get; set; }
        public string Name { get; set; }
        public string SecondName { get; set; }
        public string SchoolId { get; set; }

        public string ClassName { get; set; }        
    }
}