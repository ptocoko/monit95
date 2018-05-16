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
        public (int, string) SolveForRussian(ParticipTest participTest)
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

            int countOfSolvedTasks = GetCountOfSolvedTasks(participTest);

            if(countOfSolvedTasks < minNotFailTasks)
            {
                //participTest.Grade5 = 2;
                //participTest.GradeString = "Уровень ниже базового";
                return (2, "Уровень ниже базового");
            }
            if(countOfSolvedTasks < minHigherGradeTasks)
            {
                //participTest.Grade5 = 3;
                //participTest.GradeString = "Уровень базовой подготовки";
                return (3, "Уровень базовой подготовки");
            }
            else
            {
                //participTest.Grade5 = 4;
                //participTest.GradeString = "Уровень прочной базовой подготовки";
                return (4, "Уровень прочной базовой подготовки");
            }

            throw new Exception("Something went wrong");
        }
        
        public (int, string) SolveForMath(ParticipTest participTest)
        {
            int minNotFailTasks;
            int minHigherGradeTasks;

            switch (participTest.ProjectTestId)
            {
                case 2034:
                    minNotFailTasks = 7;
                    minHigherGradeTasks = 9;
                    break;
                case 2037:
                    minNotFailTasks = 8;
                    minHigherGradeTasks = 10;
                    break;
                case 2040:
                    minNotFailTasks = 10;
                    minHigherGradeTasks = 13;
                    break;
                default:
                    throw new ArgumentException();
            }

            var countOfSolvedTasks = GetCountOfSolvedTasks(participTest);

            if (countOfSolvedTasks < minNotFailTasks)
            {
                return (2, "Уровень ниже базового");
            }
            if (countOfSolvedTasks < minHigherGradeTasks)
            {
                return (3, "Уровень базовой подготовки");
            }
            else
            {
                return (4, "Уровень прочной базовой подготовки");
            }

            throw new Exception("Something went wrong");
        }

        public (int, string) SolveForReading(ParticipTest participTest)
        {
            int minNotFailTasks;
            int minHigherGradeTasks;

            switch (participTest.ProjectTestId)
            {
                case 2035:
                    minNotFailTasks = 6;
                    minHigherGradeTasks = 9;
                    break;
                case 2038:
                    minNotFailTasks = 8;
                    minHigherGradeTasks = 11;
                    break;
                case 2041:
                    minNotFailTasks = 10;
                    minHigherGradeTasks = 13;
                    break;
                default:
                    throw new ArgumentException();
            }

            var countOfSolvedTasks = GetCountOfSolvedTasks(participTest);

            if (countOfSolvedTasks < minNotFailTasks)
            {
                return (2, "Учащийся не достиг необходимого уровня осознанности чтения");
            }
            if (countOfSolvedTasks < minHigherGradeTasks)
            {
                return (3, "Учащийся достиг необходимого уровня осознанности чтения");
            }
            else
            {
                return (4, "Учащийся имеет хороший уровень осознанности чтения");
            }

            throw new Exception("Something went wrong");
        }

        private int GetCountOfSolvedTasks(ParticipTest participTest)
        {
            var generalPartMarks = participTest.OneTwoThreeQuestionMarks.Where(p => p.OneTwoThreeQuestion.IsGeneralPart);
            var marksByNumber = generalPartMarks.GroupBy(gb => gb.OneTwoThreeQuestion.Number).Select(s => s.Select(s2 => s2.AwardedMark).Sum());

            return marksByNumber.Where(p => p != 0).Count();
        }

        public void SolveForRussianByList(IQueryable<ParticipTest> participTests)
        {
            foreach (var participTest in participTests.Where(p => p.ProjectTest.Test.NumberCode.Substring(2, 2) == "01"))
            {
                (participTest.Grade5, participTest.GradeString) = SolveForRussian(participTest);
            }
        }

        public void SolveForMathByList(IQueryable<ParticipTest> participTests)
        {
            foreach (var participTest in participTests.Where(p => p.ProjectTest.Test.NumberCode.Substring(2, 2) == "02"))
            {
                (participTest.Grade5, participTest.GradeString) = SolveForMath(participTest);
            }
        }

        public void SolveForReadingByList(IQueryable<ParticipTest> participTests)
        {
            foreach (var participTest in participTests.Where(p => p.ProjectTest.Test.NumberCode.Substring(2, 2) == "03"))
            {
                (participTest.Grade5, participTest.GradeString) = SolveForReading(participTest);
            }
        }
    }
}
