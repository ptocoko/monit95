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

namespace Monit95App.Services
{
    public class RsurParticipProtocolService : IParticipProtocolService
    {
        #region Fields

        private readonly IGenericRepository<TestResult> _testResultRepository;

        #endregion

        #region Methods

        public RsurParticipProtocolService(IGenericRepository<TestResult> testResultRepository)
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
            var participGroupResults = _testResultRepository.GetAll()
                                        .Where(x => x.ParticipTest.ProjectTest.TestId == testId)
                                        .GroupBy(x => x.ParticipTest.ParticipCode);
            if(testDate != null)
            {
                participGroupResults = participGroupResults.Where(x => x.Any(y => y.ParticipTest.ProjectTest.TestDate <= testDate));
            }            

            return participGroupResults.ToList();
        }

        public IList<ParticipProtocol> CreateReportModel(IList<IGrouping<string, TestResult>> resultsGroupByParticipCode)
        {
            var participProtocolModels = new List<ParticipProtocol>();

            foreach (var participResults in resultsGroupByParticipCode)
            {
                var model = new ParticipProtocol();                
                var lastResult = participResults.OrderBy(x => x.ParticipTest.ProjectTest.TestNumber).Single(); //get last result

                model.ParticipCode = lastResult.ParticipTest.ProjectParticip.ParticipCode;
                model.FullName = $"{lastResult.ParticipTest.ProjectParticip.Surname} {lastResult.ParticipTest.ProjectParticip.Name}";
                if (!String.IsNullOrEmpty(lastResult.ParticipTest.ProjectParticip.SecondName))
                {
                    model.FullName = lastResult.ParticipTest.ProjectParticip.SecondName;
                }
                model.TestName = lastResult.ParticipTest.ProjectTest.Test.Name;
            }
            return participProtocolModels;
        }

        #endregion
    }
}
