using Monit95App.Domain.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.OneTwoThree.QuestionProtocol
{
    public class GradeSolver
    {
        public static (int, string) SolveForRussian(ParticipTest participTest)
        {
            int minNotFailTasks;
            int minHigherGradeTasks;

            switch (participTest.ProjectTestId)
            {
                case 2033:
                    minNotFailTasks = 7;
                    minHigherGradeTasks = 9;
                    break;
                case 2036:
                    minNotFailTasks = 7;
                    minHigherGradeTasks = 9;
                    break;
                case 2039:
                    minNotFailTasks = 9;
                    minHigherGradeTasks = 12;
                    break;
                default:
                    throw new ArgumentException();
            }
            var generalPartMarks = participTest.OneTwoThreeQuestionMarks.Where(p => p.OneTwoThreeQuestion.IsGeneralPart);
            var marksByNumber = generalPartMarks.GroupBy(gb => gb.OneTwoThreeQuestion.Number).Select(s => s.Select(s2 => s2.AwardedMark).Sum());

            int countOfSolvedTasks = marksByNumber.Where(p => p != 0).Count();

            if(countOfSolvedTasks < minNotFailTasks)
            {
                participTest.Grade5 = 2;
                participTest.GradeString = "Уровень ниже базового";
                return (2, "Уровень ниже базового");
            }
            if(countOfSolvedTasks < minHigherGradeTasks)
            {
                participTest.Grade5 = 3;
                participTest.GradeString = "Уровень базовой подготовки";
                return (3, "Уровень базовой подготовки");
            }
            else
            {
                participTest.Grade5 = 4;
                participTest.GradeString = "Уровень прочной базовой подготовки";
                return (4, "Уровень прочной базовой подготовки");
            }

            throw new Exception("Something went wrong");
        }
    }
}
