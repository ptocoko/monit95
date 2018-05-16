using Monit95App.Infrastructure.Data;
using Monit95App.Services.OneTwoThree.QuestionProtocol;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProtocolGenerator
{
    public class OneTwoThree
    {
        private readonly CokoContext context;
        private readonly GradeSolver gradeSolver;

        public OneTwoThree(CokoContext context, GradeSolver gradeSolver)
        {
            this.context = context;
            this.gradeSolver = gradeSolver;
        }

        public void Generate()
        {
            var participTest = context.ParticipTests.AsNoTracking().SingleOrDefault(p => p.Id == 385074);

            var (grade5, gradeStr) = gradeSolver.SolveForRussian(participTest);

            Console.WriteLine(gradeStr);
        }
    }
}
