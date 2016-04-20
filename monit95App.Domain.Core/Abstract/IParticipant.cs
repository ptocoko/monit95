using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace monit95App.Domain.Core.Abstract
{
    interface IParticipant
    {
        string Surname { get; set; }
        string Name { get; set; }
        string SecondName { get; set; }
        string ClassName { get; set; }
        school School { get; set; }
    }
}
