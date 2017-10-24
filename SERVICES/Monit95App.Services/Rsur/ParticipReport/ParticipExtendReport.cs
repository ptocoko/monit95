﻿using System;
using System.Collections.Generic;

namespace Monit95App.Services.Rsur.ParticipReport
{
    public class ParticipExtendReport : ParticipReport
    {
        public DateTime TestDate { get; set; }

        public string TestName { get; set; } // e.g.: "Алгебра" || "0201 - Алгебра"

        IEnumerable<EgeQuestionResult> EgeQuestionResults { get; set; }
    }

    public class EgeQuestionResult
    {
        public int EgeQuestionNumber { get; set; }

        public string RsurQuestionNumbers { get; set; } // e.g. 1.1; 1.2; 1.3

        public string ElementNames { get; set; }

        public int Value { get; set; } // %
    }
}
