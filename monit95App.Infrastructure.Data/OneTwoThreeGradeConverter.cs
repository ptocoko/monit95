using Monit95App.Infrastructure.Data.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Infrastructure.Data
{
    public class OneTwoThreeGradeConverter : IGrade5
    {
        public string ConvertToString(int grade)
        {
            string gradeStr;
            switch (grade)
            {
                case -1:
                    gradeStr = "";
                    break;
                case 2:
                    gradeStr = "Уровень ниже базового";
                    break;
                case 3:
                    gradeStr = "Уровень базовой подготовки";
                    break;
                case 4:
                    gradeStr = "Уровень прочной базовой подготовки";
                    break;
                case 5:
                    gradeStr = "Повышенный уровень";
                    break;
                default:
                    throw new ArgumentException();
            }

            return gradeStr;
        }
    }
}
