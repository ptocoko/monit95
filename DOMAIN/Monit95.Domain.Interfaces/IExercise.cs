using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace monit95App.Domain.Interfaces
{
    interface IExercise
    {
        //Ответственность класса - описание сущности ЗАДАНИЯ
        int Number { get; set; } //номер задания
        int Value { get; set; } //полученный балл за задание
        int MaxValue { get; set; } //максимальный балл за задание                
        int Level { get; set; } //уровень: Б(1) - базовый; П(2) - повышенный; В(3) - высокий
    }
}
