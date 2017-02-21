using Monit95App.Domain.Core;
using Monit95App.Models.Abstarct;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Monit95App.Models
{
    public class TResultViewer : ITResultViewModel
    {
        public TResultViewModel CreateViewModel(TestResult entity)
        {
            int index = entity.Marks.IndexOf("|");
            var outMarks = entity.Marks.Substring(0, index);
            var vm = new TResultViewModel
            {
                PParticipCode = entity.ParticipCode,
                Marks = outMarks
            };

            return vm;
        }
    }
}