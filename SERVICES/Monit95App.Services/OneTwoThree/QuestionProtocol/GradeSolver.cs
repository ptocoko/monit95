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
        public void SolveForRussian(TasksMarks min, TasksMarks mid, TasksMarks max, ParticipTest participTest)
        {
            var generalPartMarks = participTest.OneTwoThreeQuestionMarks.Where(p => p.OneTwoThreeQuestion.IsGeneralPart).GroupBy(gb => gb.OneTwoThreeQuestion.Number);
            int countOfSolvedTasks = generalPartMarks.Select(s => s.Select(s2 => s2.AwardedMark).Sum()).Where(p => p != 0).Count();
        }


    }

    public class TasksMarks
    {
        public int Tasks { get; set; }
        public int Marks { get; set; }
    }
}
