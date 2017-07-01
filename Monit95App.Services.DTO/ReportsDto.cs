using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Domain.DTO
{
    public class ReportsDto
    {
        public string BlockName { get; set; }
        public List<DescriptionDto> PartsDescription { get; set; }
        public List<DescriptionDto> ElementsDescription { get; set; }
        public DateTime TestDate { get; set; }
        public List<ParticipReportDto> ParticipReports { get; set; }
    }

    public class ParticipReportDto
    {
        public string ParticipCode { get; set; }
        public List<ParticipResultDto> Results { get; set; }
    }

    public class ParticipResultDto
    {
        public int PrimaryMark { get; set; }
        public int Grade5 { get; set; }
        public string Marks { get; set; }
        public double[] PartsResults { get; set; }
        public double[] ElementsResults { get; set; }
    }

    public class DescriptionDto
    {
        public string Code { get; set; }
        public string ExerNames { get; set; }
        public string Name { get; set; }
    }
}
