using Monit95App.Domain.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Models.Abstarct
{
    public interface ITResultViewModel
    {
        TResultViewModel CreateViewModel(TestResult entity);
    }
}
