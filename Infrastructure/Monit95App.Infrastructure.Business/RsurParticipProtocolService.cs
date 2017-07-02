﻿using Monit95App.Domain.Core;
using Monit95App.Domain.Interfaces;
using Monit95App.Infrastructure.Business.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Monit95App.Infrastructure.Business.Models;

namespace Monit95App.Infrastructure.Business
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

        public IList<ParticipProtocolModel> CreateReportModel(IList<IGrouping<string, TestResult>> participGroupResults)
        {

            return new List<ParticipProtocolModel>();
        }

        #endregion
    }
}