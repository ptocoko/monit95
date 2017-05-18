using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Monit95App.Domain.Core;

namespace ProtocolGenerator
{
    public class SubjectDefaultName : ISubjectName
    {
        private readonly TestResultsV2 _result;

        public string Name => _result.ExerciseMark.Test.Name;

        public SubjectDefaultName(TestResultsV2 result)
        {
            _result = result;
        }
    }
}
