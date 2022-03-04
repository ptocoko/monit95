using Monit95App.Domain.Core;
using System;

namespace Monit95App.Services.DTOs
{
    public class FirstClassReportDto
    {
        public SchoolParticip SchoolParticipInfo { get; set; }

        public int ParticipTestId { get; set; }

        public string ClassName { get; set; }

        public double? PrimaryMark { get; set; }

        public string GradeGroup { get; set; }

        public string MarksString { get; set; }

        public DateTime TestDateTime { get; set; }

        public string TestDate { get; set; }

        public string[] Marks { get; set; }
        public string[] GradeStrings { get; set; }
        public int Grade5 { get; set; }
    }
}
