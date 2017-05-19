using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Monit95App.Domain.Core;
using ProtocolGenerator.Interfaces;

namespace ProtocolGenerator
{
    public class SubjectDefaultName : ISubjectName
    {
        private readonly Test _test;        

        public SubjectDefaultName(Test test)
        {
            _test = test;
        }

        public string GetSubjectName()
        {
            return _test.Name;
        }
    }
}
