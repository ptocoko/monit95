using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.Work.Abstract
{
    public interface IExerciseExtend : IExerciseBase
    {
        string SubjectParts { get; set; } //разделы i.e.: 01 Механика        
        string SubjectThemes { get; set; } //Проверяемые элементы содержания (темы)
        string SubjectSkills { get; set; } //Проверяемые умения
        string Level { get; set; } //Б-П-В or "Б;П"
    }
}
