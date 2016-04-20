using Monit95App.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using АИС_МОР.Domain.Concrete.Monit10_1516;

namespace Monit95App.ViewModels.Monit10_1516
{
    public class AddLearnerVM : ViewModelBase
    {
        public Learner learner { get; set; }
        public List<ElementPlan> ElementPlans { get; set; }

        public AddLearnerVM()
        {
            ElementPlans = new List<ElementPlan>();
        }
    }
}