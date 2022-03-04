using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace monit95App.Domain.Interfaces
{
    public interface IWork //Диагностическая работы
    {
        string Name { get; set; } //Наименование диагностической работы
        int PrimaryMark { get; set; }
        int TestResult5 { get; set; }
        int TestResult100 { get; set; }
        double Percent { get; set; } //процент выполненич ДР
        List<IExercise> ExerciseList { get; set; }
    }
}
