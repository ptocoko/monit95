using Monit95App.Services.Work.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.Work.Abstract
{
    public interface IExerciseBase
    {
        int Number { get; set; } //номер задания
        int MaxMark { get; set; } //максимальный балл за задание
        List<double> LearnerMarks { get; set; }
        ExerciseResult Result { get; set; }
    }
}