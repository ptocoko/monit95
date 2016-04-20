using Monit95App.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using АИС_МОР.Domain.Concrete.Monit10_1516;

namespace Monit95App.ViewModels.Monit10_1516
{
    public class LearnesListVM : ViewModelBase
    {
        public IQueryable<Learner> Lerners { get; set; }
    }
}