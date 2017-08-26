using Monit95App.Domain.Core;
using Monit95App.Domain.Core.Entities;
using Monit95App.Domain.Interfaces;
using Monit95App.Services.Interfaces;
using Monit95App.Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.Rsur
{
    public class RsurParticipProtocolService : IParticipProtocolService
    {
        #region Fields

        private readonly IGenericRepository<RsurTestResult> _testResultRepository;

        #endregion

        #region Methods

        public RsurParticipProtocolService(IGenericRepository<RsurTestResult> testResultRepository)
        {            
            _testResultRepository = testResultRepository;
        }        

        /// <summary>
        /// Get test's result grouped by ParticipCode. If testDate is not null, then return to the specified date
        /// </summary>
        /// <returns>Grouped results</returns>
        public IList<IGrouping<string, RsurTestResult>> GetTestResultsGroupByParticipCode(string testIdStr, DateTime? testDate = null)
        {
            var testId = new Guid(testIdStr);
            var participGroupResults = _testResultRepository.GetAll()
                                        .Where(x => x.RsurParticipTest.RsurTest.TestId == testId)
                                        .GroupBy(x => x.RsurParticipTest.ParticipCode);
            if(testDate != null)
            {
                participGroupResults = participGroupResults.Where(x => x.Any(y => y.RsurParticipTest.RsurTest.TestDate <= testDate));
            }            

            return participGroupResults.ToList();
        }

        public IList<ParticipProtocol> CreateReportModel(IList<IGrouping<string, RsurTestResult>> resultsGroupByParticipCode)
        {
            var participProtocolModels = new List<ParticipProtocol>();

            foreach (var participResults in resultsGroupByParticipCode)
            {
                var model = new ParticipProtocol();                
                var lastResult = participResults.OrderBy(x => x.RsurParticipTest.RsurTest.TestNumber).Single(); //get last result

                model.ParticipCode = lastResult.RsurParticipTest.RsurParticip.ParticipCode;
                model.FullName = $"{lastResult.RsurParticipTest.RsurParticip.Surname} {lastResult.RsurParticipTest.RsurParticip.Name}";
                if (!String.IsNullOrEmpty(lastResult.RsurParticipTest.RsurParticip.SecondName))
                {
                    model.FullName = lastResult.RsurParticipTest.RsurParticip.SecondName;
                }
                model.TestName = lastResult.RsurParticipTest.RsurTest.Test.Name;
            }
            return participProtocolModels;
        }

        #endregion
    }
}
