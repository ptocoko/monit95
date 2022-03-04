using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.Rsur.ParticipReport
{
    public class ReportsListOptions
    {
        public uint Length { get; set; } = 30;

        public uint Page { get; set; } = 1;

        public string Search { get; set; }

        public string SchoolId { get; set; }

        public string TestCode { get; set; }

        public string ExamCode { get; set; }
    }
}
