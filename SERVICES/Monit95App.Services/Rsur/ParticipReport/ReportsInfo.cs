﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.Rsur.ParticipReport
{
    public class ReportsInfo
    {
        public IEnumerable<string> SchoolNames { get; set; }

        public IEnumerable<string> TestNames { get; set; }

        public IEnumerable<ExamDto> ExamNames { get; set; }
    }

    public class ExamDto : IComparable<ExamDto>
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public DateTime Date { get; set; }

        public int CompareTo(ExamDto dto2)
        {
            return String.Compare(this.Code, dto2.Code);
        }
    }
}
