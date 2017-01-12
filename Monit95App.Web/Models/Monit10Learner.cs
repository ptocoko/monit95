using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Monit95App.Models
{
    public class Monit10Learner
    {
        public int LearnerID { get; set; }        
        public string ElCode { get; set; }
        public string Surname { get; set; }
        public string Name { get; set; }
        public string SecondName { get; set; }
        public string ClassName { get; set; }
        public double ValueOge15 { get; set; }
        public int RatingID { get; set; }
        public int? RatingValue { get; set; }
    }
}