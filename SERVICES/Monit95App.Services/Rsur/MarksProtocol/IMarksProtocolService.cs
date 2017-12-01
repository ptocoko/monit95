using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace Monit95App.Services.Rsur.MarksProtocol
{
    [SuppressMessage("ReSharper", "UnusedMember.Global")]
    public interface IMarksProtocolService
    {
        // TODO: delete
        // RsurTestStatisticsDto GetStatistics(int rsurTestId, int? areaCode = null);        
        IDictionary<int, RsurTestStatisticsDto> GetStatistics(int areaCode);

        string GetTestName(int rsurTestId);                

        Domain.Core.MarksProtocol Get(int participCode, int areaCode); // areaCode for Validate

        void CreateOrEditRsurTestResultEntity(Domain.Core.MarksProtocol marksProtocol, int areaCode);
        List<ValidationResult> ModelValidationResults { get; }
    }
}
