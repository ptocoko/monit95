using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Monit95App.ViewModels.CollectorMarks
{
    public class StudentViewModel
    {
        public string SchoolId { get; set; }
        public string Surname { get; set; }
        public string Name { get; set; }
        public string SecondName { get; set; }
        public string ClassName { get; set; }
        public IEnumerable<Exercise> Exercises { get; set; }
    }

    public class Exercise
    {
        public string Name { get; set; }
        public int MaxRate { get; set; }
        public int CurrentMark { get; set; }
    }
}