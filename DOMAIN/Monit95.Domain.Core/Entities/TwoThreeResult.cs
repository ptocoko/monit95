using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Domain.Core.Entities
{
    public class TwoThreeResult
    {
        public int Id { get; set; }
        public string Surname { get; set; }
        public string Name { get; set; }
        public string SecondName { get; set; }
        public int PrimaryMark { get; set; }
        public string Marks { get; set; }
        public string TestCode { get; set; }


        public string SchoolId { get; set; }
        
        public virtual School School { get; set; }
    }
}
