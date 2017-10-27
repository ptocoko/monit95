using System;
using System.Collections.Generic;

namespace Monit95App.Services.Rsur.ParticipReport
{
    public interface IParticipReportService
    {        
        ParticipExtendReport GetReport(int rsurParticipTestId);
        IEnumerable<ParticipReport> GetResultsByTestDate(int areaCode, DateTime testDate);
        IEnumerable<EgeQuestionResult> GetEgeQuestionResults(Guid testId, int[] egeQuestionValuesArray);
    }
}
