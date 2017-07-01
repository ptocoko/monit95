using Monit95App.Domain.Core;
using Monit95App.Domain.Interfaces;
using Monit95App.Infrastructure.Business.Interfaces;
using Monit95App.Infrastructure.Business.Models.Report;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Infrastructure.Business
{
    public class RsurParticipReportService : IParticipReportService
    {
        #region Fields

        private readonly IGenericRepository<TestResult> _testResultRepository;

        #endregion

        #region Methods

        public RsurParticipReportService(IGenericRepository<TestResult> testResultRepository)
        {            
            this._testResultRepository = testResultRepository;
        }        

        /// <summary>
        /// Get test's result grouped by ParticipCode. If testDate is not null, then return to the specified date
        /// </summary>
        /// <returns>Grouped results</returns>
        public IList<IGrouping<string, TestResult>> GetTestResultsGroupByParticipCode(string testIdStr, DateTime? testDate = null)
        {
            var testId = new Guid(testIdStr);
            var allResults = _testResultRepository.GetAll().ToList();
            var participGroupResults = allResults.Where(x => x.ParticipTest.ProjectTest.TestId == testId)
                                                 .GroupBy(x => x.ParticipTest.ParticipCode).ToList();
            if(testDate != null)
            {
                participGroupResults = participGroupResults.Where(x => x.Any(y => y.ParticipTest.ProjectTest.TestDate <= testDate)).ToList();
            }            

            return participGroupResults;
        }

        public IList<ParticipReportModel> CreateReportModel(IList<IGrouping<string, TestResult>> participGroupResults)
        {

            return new List<ParticipReportModel>();
        }

        #endregion
    }
}
