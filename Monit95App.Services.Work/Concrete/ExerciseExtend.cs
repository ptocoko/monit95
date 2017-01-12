using Monit95App.Services.Work.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.Work.Concrete
{
    public class ExerciseExtend : IExerciseExtend, ICloneable
    {
        public int Number { get; set; }
        public int MaxMark { get; set; }
        public List<double> LearnerMarks { get; set; }
        public ExerciseResult Result { get; set; }

        public string SubjectParts { get; set; }        
        public string SubjectThemes { get; set; }
        public string SubjectSkills { get; set; } 
        public string Level { get; set; }
       
        public ExerciseExtend()
        {
            LearnerMarks = new List<double>();
            Result = new ExerciseResult();
        }

        public object Clone()
        {
            return new ExerciseExtend()
            {
                Number = this.Number,
                MaxMark = this.MaxMark,
                Result = new ExerciseResult { Percent = this.Result.Percent },
                SubjectParts = this.SubjectParts,
                SubjectThemes = this.SubjectThemes,
                SubjectSkills = this.SubjectSkills,
                Level = this.Level
            };
        }
    }
}
