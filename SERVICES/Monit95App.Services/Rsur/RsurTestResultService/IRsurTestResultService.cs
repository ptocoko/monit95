namespace Monit95App.Services.Rsur.RsurTestResultService
{
    using System.Collections.Generic;

    using Monit95App.Services.Validation;
    
    public interface IRsurTestResultService
    {
        // TODO: delete
        // RsurTestStatisticsDto GetStatistics(int rsurTestId, int? areaCode = null);        
        IDictionary<int, RsurTestStatisticsDto> GetStatistics(int areaCode);

        string GetTestName(int rsurTestId);                

        RsurTestResultDto Get(int participCode, int areaCode); // areaCode for Validate

        ServiceResult<object> CreateOrUpdate(RsurTestResultDto rsurTestResultDto, int areaCode);        
    }
}
