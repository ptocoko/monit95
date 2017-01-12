using Monit95App.Domain.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Monit95App.ViewModels.CokoEmployer
{
    public class SelectVM
    {
        public IEnumerable<Work201615Model> Work201615List { get; set; } //Список школ со сбора итоговых работ 1-3 классов
    }
}