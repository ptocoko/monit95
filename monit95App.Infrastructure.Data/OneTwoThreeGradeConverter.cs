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
                case 2:
                    gradeStr = "Ниже базового";
                    break;
                case 3:
                    gradeStr = "Базовой подготовки";
                    break;
                case 4:
                    gradeStr = "Прочной базовой подготовки";
                    break;
                case 5:
                    gradeStr = "Повышенный";
                    break;
                default:
                    throw new ArgumentException();
            }

            return gradeStr;
        }
    }
}
