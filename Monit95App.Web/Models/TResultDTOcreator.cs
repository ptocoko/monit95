using Monit95App.Domain.Core;
using Monit95App.Models.Abstarct;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Monit95App.Models
{
    public class TResultDTOcreator : ITResultDTOcreator
    {
        public TResultDTO FactoryMethod(TestResult entity)
        {
            int index = entity.Marks.IndexOf("|");
            var outMarks = entity.Marks.Substring(0, index);
            var vm = new TResultDTO
            {
                PParticipCode = entity.ParticipCode,
                Marks = outMarks,
                TestNameWithTestDate = $@"{entity.TestPlan.Test.Name}, {entity.TestDate.ToShortDateString()}"                
            };

            return vm;
        }
    }
}