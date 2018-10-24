﻿using Monit95App.Domain.Core;

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

        public string[] Marks { get; set; }
    }
}