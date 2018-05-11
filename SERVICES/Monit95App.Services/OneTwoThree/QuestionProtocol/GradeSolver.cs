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
        public void SolveForRussian(ParticipTest participTest)
        {
            int minNotFailTasks;
            int maxMidGradeMarks;
            int minHigherGradeTasks;

            switch (participTest.ProjectTestId)
            {
                case 2033:
                    minNotFailTasks = 7;
                    maxMidGradeMarks = 12;
                    minHigherGradeTasks = 9;
                    break;
                case 2036:
                    minNotFailTasks = 8;
                    maxMidGradeMarks = 13;
                    minHigherGradeTasks = 10;
                    break;

                default:
                    throw new ArgumentException();
            }
            var generalPartMarks = participTest.OneTwoThreeQuestionMarks.Where(p => p.OneTwoThreeQuestion.IsGeneralPart);
            var marksByNumber = generalPartMarks.GroupBy(gb => gb.OneTwoThreeQuestion.Number).Select(s => s.Select(s2 => s2.AwardedMark).Sum());

            int countOfSolvedTasks = marksByNumber.Where(p => p != 0).Count();
            int sumOfMarks = generalPartMarks.Select(s => s.AwardedMark).Sum();

            if(countOfSolvedTasks < minNotFailTasks)
            {
                participTest.Grade5 = 2;
                participTest.GradeString = "Уровень ниже базового";
                return;
            }
            else if(sumOfMarks <= maxMidGradeMarks)
            {
                participTest.Grade5 = 3;
                participTest.GradeString = "Уровень базовой подготовки";
                return;
            }
            if(countOfSolvedTasks >= minHigherGradeTasks)
            {
                participTest.Grade5 = 4;
                participTest.GradeString = "Уровень прочной базовой подготовки";
                return;
            }
            else
            {
                participTest.Grade5 = 3;
                participTest.GradeString = "Уровень базовой подготовки";
                return;
            }

            throw new Exception("Something went wrong");
        }


    }

    public class TasksMarks
    {
        public int Tasks { get; set; }
        public int Marks { get; set; }
    }
}
