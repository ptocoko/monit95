﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Infrastructure.Business.Models.Report
{
    public class MarkResultModel
    {
        public int TestNumber { get; set; }
        public string Marks { get; set; }
        public int PrimaryMark { get; set; }
        public int Grade5 { get; set; }
    }
}
