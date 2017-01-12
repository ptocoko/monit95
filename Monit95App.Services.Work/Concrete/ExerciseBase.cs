using Monit95App.Services.Work.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.Work.Concrete
{
    public class ExerciseBase : IExerciseBase
    {
        public int Number { get; set; }
        public int MaxMark { get; set; }
        public List<double> LearnerMarks { get; set; }
        public ExerciseResult Result { get; set; }

        public ExerciseBase()
        {
            LearnerMarks = new List<double>();
        }
    }
}
